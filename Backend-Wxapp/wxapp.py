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


class login_status(db.Model):
    __tablename__ = 'login_status'
    openid = db.Column(db.VARCHAR(128), primary_key=True, nullable=False, index=True)
    session_key = db.Column(db.VARCHAR(256), nullable=False)
    login_status = db.Column(db.VARCHAR(128), nullable=False)
    expire_time = db.Column(db.TIMESTAMP, nullable=False)

    def __init__(self, openid, session_key):
        self.openid = openid
        self.session_key = session_key
        self.expire_time = datetime.datetime.now() + datetime.timedelta(hours=12)
        pass

    def __repr__(self):
        return '<User %s>' % self.openid

    def save(self):
        db.session.add(self)
        db.commit()


@app.route('/onLogin', methods=['POST'])
def onLogin():
    # 获取code
    args = json.load(request.data)
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
    res = json.load(wx_respond.data)
    if not res['errmsg']:
        login_session = wxapp.gen_3rd_session_key()
    return json.dump(wx_respond)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
