# create two tables in database:
$ sqlite3 database.db
> CREATE TABLE users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    username TEXT,
    password TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
> CREATE TABLE articles (
    articleid INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER,
    username TEXT,
    view_count INTEGER DEFAULT 0,
    save_count INTEGER DEFAULT 0,
    content TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
> .quit

# table creation upon registration:
> CREATE TABLE <userid>_inbox (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, senderid INTEGER, message TEXT);

> CREATE TABLE <userid>_outbox (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, receiverid INTEGER, message TEXT);

> CREATE TABLE <userid>_friends (userid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

> CREATE TABLE <userid>_saved_articles (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

> CREATE TABLE <userid>_published_articles (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

# data collection
$ sqlite3 database.db .dump > database.sql