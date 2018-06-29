from flask import Flask, render_template, request, g
import sqlite3

DATABASE = './database.db'

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    with app.app_context():
        db = get_db()
        cur = db.cursor()
        messages = []
        if request.form and request.method == "POST":
            action = request.form.get('action')
            if action == "Post":
                name = request.form.get('name')
                message = request.form.get('message')
                cur.execute("INSERT INTO messages(name, message) VALUES ('{}', '{}')".format(name, message))
                db.commit()
                messages = query_db('SELECT * FROM messages')
            elif action == "Clear":
                cur.execute("DELETE FROM messages")
                db.commit()
                messages = query_db('SELECT * FROM messages')
            elif action == "Search":
                keyword = request.form.get('keyword')
                messages = query_db("SELECT * FROM messages WHERE name='{}'".format(keyword))
            elif action == "All":
                messages = query_db('SELECT * FROM messages')
        return render_template('home.html', messages=messages)

#####################
# Database commands #
#####################

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

if __name__ == '__main__':
    app.run(debug=True)
