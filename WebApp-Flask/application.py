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
application.config['MYSQL_DATABASE_DB'] = 'beenthereWeb'
mysql.init_app(application)

#####################
# Application Route #
#####################

@application.route('/', methods=['GET', 'POST'])
def home():
    with application.app_context():
        db = mysql.connect()
        cur = db.cursor()
        if request.form and request.method == "POST":
            action = request.form.get('action')
            nickname = request.form.get('name')
            title = request.form.get('title')
            content = request.form.get('message')
            cur.execute("INSERT INTO articles(nickname, title, content) VALUES ('{}', '{}', '{}')".format(nickname, title, content))
            db.commit()
        return render_template('home.html')

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
