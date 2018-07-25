from flask import Flask, request
from flask_wxapp import WXApp
from flask_sqlalchemy import SQLAlchemy
# from config import Config
import urllib.request as urllib2
import json
import datetime
import redis

wxapp = WXApp()
app = Flask(__name__)

# app.config['MYSQL_DATABASE_HOST'] = 'beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com'
# app.config['MYSQL_DATABASE_PORT'] = 3306
# app.config['MYSQL_DATABASE_USER'] = 'hanx0621'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
# app.config['MYSQL_DATABASE_DB'] = 'beenthereWeb'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://hanx0621:password@beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com/beenthereWeb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['WX_APPID'] = 'wx06ecc62f568b317f'
app.config['WX_SECRET'] = 'c99528c1af5f23f40f3a3712b612e8b5'
# 域名 beenthere.space

db = SQLAlchemy(app)
wxapp.init_app(app)

pool = redis.ConnectionPool(host='localhost', port=6379, decode_responses=True)
r = redis.Redis(connection_pool=pool)


@app.route('/auth/onLogin', methods=['POST'])
def onLogin():
    # 获取code
    args = json.loads(request.data)
    # 编写微信服务器端的校验请求
    js_code = args['code']
    # appid = app.config['WX_APPID']
    # secret = app.config['WX_SECRET']
    # 发送请求并取得回调session_key，openid
    # wx_auth_url = 'https://api.weixin.qq.com/sns/jscode2session?' \
    #               'appid={}&secret={}&js_code={}&grant_type=authorization_code'.format(appid, secret, js_code)
    # wx_req = urllib2.Request(wx_auth_url)
    # wx_respond = urllib2.urlopen(wx_req).read()
    wx_respond = wxapp.jscode2session(js_code)
    # 根据微信服务器回执在数据库建立自定义登录态
    if not wx_respond['errmsg']:
        openid = wx_respond['openid']
        session_key = wx_respond['session_key']
        login_session = wxapp.gen_3rd_session_key()
        r.mset(openid=openid, session_key=session_key, login_session=login_session)
        return json.dumps({'login_session': login_session})
    else:
        return json.dumps(wx_respond)


@app.route('/auth/checkSession', methods=['POST'])
def checkSession():
    pass


@app.route('/article/publish', methods=['POST'])
def publish():
    pass


@app.route('/article/remove', methods=['POST'])
def remove():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
