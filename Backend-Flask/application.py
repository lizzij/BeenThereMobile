from flask import Flask, request, g, render_template, request, jsonify, redirect
from flaskext.mysql import MySQL

application = Flask(__name__)

mysql = MySQL()

#####################
# DB Initialization #
#####################

application.config['MYSQL_DATABASE_HOST'] = 'beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com'
application.config['MYSQL_DATABASE_PORT'] = 3306
application.config['MYSQL_DATABASE_USER'] = 'hanx0621'
application.config['MYSQL_DATABASE_PASSWORD'] = 'password'
application.config['MYSQL_DATABASE_DB'] = 'beenthere'
mysql.init_app(application)

#####################
# Application Route #
#####################

# user authentication用session解决问题

@application.route('/')
def home():
    return jsonify(status = "hello world")

@application.route('/login', methods=['POST'])
def login():
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        userid = request.json['userid']
        password = request.json['password']
        cur.execute("SELECT password FROM users WHERE userid = '{}'".format(userid))
        credential = cur.fetchall()
        if not credential:
            return jsonify(status = "user not found")
        elif credential[0][0] == password:
            return jsonify(status = "login success")
            # session在这里开始
        else:
            return jsonify(status = "invalid password")

# primary key和用户id分开，表越少越好

@application.route('/register', methods=['POST'])
def register():
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        username = request.json['username']
        password = request.json['password']
        cur.execute("INSERT INTO users(username, password) VALUES ('{}', '{}')".format(username, password))
        db.commit()
        cur.execute("SELECT userid FROM users ORDER BY userid DESC LIMIT 1")
        userid = cur.fetchone()[0]
        # cur.execute("CREATE TABLE {} (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, senderid INTEGER, message TEXT);".format(str(userid) + "_inbox"))
        # cur.execute("CREATE TABLE {} (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, receiverid INTEGER, message TEXT);".format(str(userid) + "_outbox"))
        # cur.execute("CREATE TABLE {} (userid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);".format(str(userid) + "_friends"))
        # cur.execute("CREATE TABLE {} (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);".format(str(userid) + "_saved_articles"))
        # cur.execute("CREATE TABLE {} (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);".format(str(userid) + "_published_articles"))
        db.commit()
        return jsonify(status = "register success", userid = userid)

@application.route('/get_username/<userid>', methods=['GET'])
def get_username(userid):
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        cur.execute("SELECT username FROM users WHERE userid = {}".format(userid))
        username = cur.fetchone()
        if username:
            return jsonify(status = "user found", userid = userid, username = username[0])
        else:
            return jsonify(status = "user not found", userid = userid, username = "")

@application.route('/update_username/<userid>', methods=['POST'])
def update_username(userid):
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        new_username = request.json['new_username']
        cur.execute("SELECT username FROM users WHERE userid = {}".format(userid))
        old_username = cur.fetchone()
        if old_username:
            cur.execute("UPDATE users SET username = '{}' WHERE userid = {}".format(new_username, userid))
            db.commit()
            return jsonify(status = "update success", userid = userid, old_username = old_username[0], new_username = new_username)
        else:
            return jsonify(status = "user not found", userid = userid, old_username = "", new_username = "")

@application.route('/send_message/<receiverid>', methods=['POST'])
def send_message(receiverid):
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        senderid = request.json['senderid']
        message = request.json['message']
        cur.execute("INSERT INTO messages (senderid, receiverid, message) VALUES({}, {}, '{}')".format(int(senderid), int(receiverid), message))
        db.commit()
        return jsonify(status = "message sent")

@application.route('/get_message/<userid>', methods=['GET'])
def get_message(userid):
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        cur.execute("SELECT username FROM users WHERE userid = {}".format(userid))
        username = cur.fetchone()
        cur.execute("SELECT timestamp, senderid, message FROM messages WHERE receiverid = {}".format(int(userid)))
        inbox = cur.fetchall()
        cur.execute("SELECT timestamp, receiverid, message FROM messages WHERE senderid = {}".format(int(userid)))
        outbox = cur.fetchall()
        if username:
            return jsonify(status = "retrieval success", inbox = inbox, outbox = outbox)
        else:
        	return jsonify(status = "user not found", inbox = [], outbox = [])

# @application.route('/get_article', methods=['GET'])
# def get_article():
#     pass

# @application.route('/publish_article', methods=['POST'])
# def publish_article():
#     pass

# @application.route('/check_updates<username>', methods=['GET'])
# def check_updates():
#     pass

# @application.route('/add_friends', methods=['POST'])
# def check_updates():
#     pass

#####################
# Database commands #
#####################

@application.teardown_appcontext
def close_connection(exception):
    db = mysql.connect()
    db.close()

#####################
# Debug mode switch #
#####################

if __name__ == '__main__':
    application.run(host='0.0.0.0', debug=True)
