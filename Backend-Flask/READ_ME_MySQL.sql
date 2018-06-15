# database management info:
endpoint: beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com
port: 3306
master username: hanx0621
password: password

# checking connection:
nc -zv beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com 3306

# invoking mySQL:
mysql -h beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com -P 3306 -u hanx0621 -p

# initial commands:
mysql> USE beenthere;
mysql> SELECT DATABASE();
mysql> SHOW TABLES;

# initial table creation:
mysql> CREATE TABLE users (userid INTEGER PRIMARY KEY AUTO_INCREMENT,
    -> level INTEGER DEFAULT 1, experience INTEGER DEFAULT 0,
    -> coins INTEGER DEFAULT 0, username TEXT, password TEXT,
    -> timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

mysql> CREATE TABLE articles (articleid INTEGER PRIMARY KEY AUTO_INCREMENT,
    -> userid INTEGER, view_count INTEGER DEFAULT 0, save_count INTEGER DEFAULT 0,
    -> content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

# table creation upon registration:
> CREATE TABLE <userid>_inbox (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, senderid INTEGER, message TEXT);

> CREATE TABLE <userid>_outbox (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, receiverid INTEGER, message TEXT);

> CREATE TABLE <userid>_friends (userid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

> CREATE TABLE <userid>_saved_articles (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);

> CREATE TABLE <userid>_published_articles (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
