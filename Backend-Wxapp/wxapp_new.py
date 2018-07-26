#!/usr/bin/python
# -*- coding:utf8 -*-
from flask import Flask, request
from flask_wxapp import WXApp
import json
import datetime
import pymongo

# flask配置
app = Flask(__name__)
app.config['WX_APPID'] = 'wx06ecc62f568b317f'
app.config['WX_SECRET'] = 'c99528c1af5f23f40f3a3712b612e8b5'
# 域名 beenthere.space

# 示例化app
wxapp = WXApp()
wxapp.init_app(app)

# 创建mongodb数据库
client = pymongo.MongoClient('localhost', 27017)
db = client.beenthere

# 创建数据表
login_log = db.login_log
feeds = db.feeds

# 建立索引与约束
openid_index = pymongo.IndexModel([("openid", pymongo.TEXT)], unique=True)
expire_index = pymongo.IndexModel([("expire_time", pymongo.ASCENDING)], unique=True, expireAfterSeconds=180)
title_index = pymongo.IndexModel([("title", pymongo.TEXT)], unique=True)
login_log.create_indexes([expire_index, openid_index])
feeds.create_indexes([title_index])


@app.route('/', methods=['GET', 'POST'])
def connection_check():
    return 'helloworld'


@app.route('/auth/Login', methods=['POST'])
def onLogin():
    """
    小程序微信登录操作
    :return: 返回开发者服务器的第三方登录态（校验信息保存在redis）
    """
    # 前端传来code
    args = json.loads(request.data)
    try:
        js_code = args['code']
    except:
        return json.dumps({"status": "invalid request, please send the code"})
    # 编写微信服务器端的校验请求(框架已经实现）
    wx_respond = wxapp.jscode2session(js_code)
    # 根据微信服务器回执在数据库建立自定义登录态
    if not wx_respond['errmsg']:
        openid = wx_respond['openid']
        session_key = wx_respond['session_key']
        login_session = wxapp.gen_3rd_session_key()
        login_event = {'openid': openid,
                       "session_key": session_key,
                       "login_session": login_session,
                       "expire_time": datetime.datetime.utcnow() + datetime.timedelta(seconds=60)}
        # 在mongodb中记录本次登录事件
        login_log.insert(login_event)
        return json.dumps({"status": "login success", 'login_session': login_session})
        # code正确时，返回第三方session，同时将登录信息记录到服务器中
    else:
        return json.dumps({"status": "login failed", "error": wx_respond})
        # code不正确时，返回微信服务器给的错误json


@app.route('/article/publish', methods=['POST'])
def publish():
    """
    发布一条留言，后端将标题（唯一），内容，用户openid存在mongodb中，返回发布状态
    :return:
    """
    args = json.loads(request.data)
    check_openid = session_check(args)
    if check_openid == "invalid request":
        return json.dumps({"status": "invalid request, please send login session"})
    elif not check_openid:
        return json.dumps({"status": "login expired"})
    else:
        try:
            feed = {'openid': check_openid,
                    "title": args["title"],
                    "login_session": args["content"],
                    "create_time": datetime.datetime.now()}
            feeds.insert(feed)
            return json.dumps({"status": "feed published"})
        except:
            return json.dumps({"status": "invalid feed"})


@app.route('/article/remove', methods=['POST'])
def remove():
    pass


def session_check(args):
    """
    检查发布的业务请求中是否带有login_session
    :param args:
    :return:
    """
    try:
        login_session = args['login_session']
        check = login_log.find({"login_session": login_session}, {"session_key": 1, "expire_time": 1})
        if check.retrieved == 1:
            return check[0]["session_key"]
        else:
            return False
    except:
        return "invalid request"


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
