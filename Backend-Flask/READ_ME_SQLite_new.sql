CREATE TABLE IF NOT EXISTS user_basic (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_level INTEGER DEFAULT 1,
    username TEXT UNIQUE,
    password TEXT,
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS article_basic (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY post_user_id REFERENCES FROM user_basic(user_id)
    title VARCHAR(60) UNIQUE NOT NULL,
    visible INTEGER DEFAULT 1,
    ON UPDATE NO ACTION

);

CREATE TABLE IF NOT EXISTS messages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY sender_id REFERENCES FROM user_basic(user_id)
    FOREIGN KEY receiver_id REFERENCES FROM user_basic(user_id)
    send_time DATETIME DEFAULT CURRENT_TIMESTAMP
    ON UPDATE NO ACTION
    ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS user_info (
    FOREIGN KEY user_id REFERENCES FROM user_basic(user_id)
    email VARCHAR(30)
    dob DATETIME DEFAULT CURRENT_DATE
    reg_time DATETIME DEFAULT CURRENT_TIMESTAMP
    last_exit_time DATETIME DEFAULT CURRENT_TIMESTAMP
    ON UPDATE NO ACTION
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS article_info (
    FOREIGN KEY article_id REFERENCES FROM article_basic(article_id)
    userid INTEGER,
    title VARCHAR(50) UNIQUE NOT NULL
    username TEXT,
    view_count INTEGER DEFAULT 0,
    save_count INTEGER DEFAULT 0,
    content TEXT,
    post_time DATETIME DEFAULT CURRENT_TIMESTAMP
    ON DELETE NO ACTION
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS friendship (

);

CREATE TABLE IF NOT EXISTS post (

);

CREATE TABLE IF NOT EXISTS message (

);

-- > .quit

-- # table creation upon registration:
-- > CREATE TABLE <userid>_inbox (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, senderid INTEGER, message TEXT);
--
-- > CREATE TABLE <userid>_outbox (timestamp DATETIME PRIMARY KEY DEFAULT CURRENT_TIMESTAMP, receiverid INTEGER, message TEXT);
--
-- > CREATE TABLE <userid>_friends (userid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
--
-- > CREATE TABLE <userid>_saved_articles (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
--
-- > CREATE TABLE <userid>_published_articles (articleid INTEGER PRIMARY KEY, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
--
-- # data collection
-- $ sqlite3 database.db .dump > database.sql