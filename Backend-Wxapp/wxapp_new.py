from flask import Flask, request
from flask_wxapp import WXApp
import json
import datetime
import pymongo


wxapp = WXApp()
app = Flask(__name__)
app.config['WX_APPID'] = 'wx06ecc62f568b317f'
app.config['WX_SECRET'] = 'c99528c1af5f23f40f3a3712b612e8b5'
# 域名 beenthere.space

wxapp.init_app(app)
mongo = pymongo.MongoClient('localhost',27017)
db = mongo.beenthere

login_log = db["login_log"]
login_log.createIndex([("expire_time", pymongo.ASCENDING)], expireAfterSeconds=60)


@app.route('/auth/Login', methods=['POST'])
def onLogin():
    '''
    小程序微信登录操作
    :return: 返回开发者服务器的第三方登录态（校验信息保存在redis）
    '''
    # 前端传来code
    args = json.loads(request.data)
    js_code = args['code']
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
                       "expire_time": datetime.datetime.utcnow()+ datetime.timedelta(seconds=60)}
        login_log.insert(login_event)
        return json.dumps({'login_session': login_session})
    else:
        return json.dumps(wx_respond)


@app.route('/auth/checkExpire', methods=['POST'])
def checkSession():
    '''
    检验传来的登录态是否仍然有效，若失效则应重新执行登录操作
    :return:
    '''
    # 前端传来session
    args = json.loads(request.data)
    session = args['session']
    pass


@app.route('/article/publish', methods=['POST'])
def publish():
    pass


@app.route('/article/remove', methods=['POST'])
def remove():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
