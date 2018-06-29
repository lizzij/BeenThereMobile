First, you have to set up your database! Make sure you have sqlite3 installed.
Run the following commands in the flask-demo folder:
$ sqlite3 database.db
> CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, message TEXT);
> .quit

Now, set up Flask on your laptop. The easiest way to do this is running:
$ pip install flask (or pip3)

Alternatively, you can set up an virtual environment.
Run the following in the flask-demo folder:
$ virtualenv env
$ source env/bin/activate
$ pip install flask

Now, you can run the app using:
$ python app.py (or python3)
