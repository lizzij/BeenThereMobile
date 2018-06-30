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
mysql> USE beenthereWeb;
mysql> SELECT DATABASE();
mysql> SHOW TABLES;

# primary table creation:
CREATE TABLE articles (articleid INTEGER PRIMARY KEY AUTO_INCREMENT, nickname TEXT, 
	title TEXT NOT NULL, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);