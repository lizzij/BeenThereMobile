from flask import Flask, request
from flask_wxapp import WXApp
from flask_sqlalchemy import SQLAlchemy
from .config import Config
import urllib.request as urllib2
import json

wxapp = WXApp()
app = Flask(__name__)
db = SQLAlchemy(app)
wxapp.init_app(app)

class login_status(db.Model):
    __tablename__ = 'login_status'
    openid = db.Column(db.VARCHAR(128), primary_key=True, nullable=False)
    session_key = db.Column(db.VARCHAR(256), nullable=False)
    login_status = db.Column(db.VARCHAR(5), nullable=False)


@app.route('/onLogin', methods=['GET'])
def login():
    # 获取code
    args = request.values
    # 编写微信服务器端的校验请求
    js_code = args['code']
    appid = app.config['WX_APPID']
    secret = app.config['WX_SECRET']
    # 发送请求并取得回调session_key，openid
    wx_auth_url = 'https://api.weixin.qq.com/sns/jscode2session?' \
          'appid={}&secret={}&js_code={}&grant_type=authorization_code'.format(appid, secret, js_code)
    wx_req = urllib2.Request(wx_auth_url)
    wx_respond = urllib2.urlopen(wx_req).read()
    rt_respond = wx_respond

    rt_respond['login_status'] =
    return json.dump(wx_respond)







if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
