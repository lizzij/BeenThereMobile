CREATE TABLE IF NOT EXISTS user_basic (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(60) UNIQUE NOT NULL,
);

CREATE TABLE IF NOT EXISTS article_basic (
    article_id INT PRIMARY KEY AUTO_INCREMENT,
    post_user_id INT,
    title VARCHAR(100) UNIQUE NOT NULL,
    visible INTEGER DEFAULT 1,
    FOREIGN KEY (post_user_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tag (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    tag_title VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    send_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_info (
    user_id INT PRIMARY KEY,
    user_level INT DEFAULT 1,
    user_experience INT DEFAULT 1,
    email VARCHAR(30),
    date_of_birth TIMESTAMP,
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_exit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS article_info (
    article_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    view_count INT DEFAULT 0,
    save_count INT DEFAULT 0,
    content TEXT,
    post_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES article_basic(article_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS friendship (
    inviter_id INT,
    receiver_id INT,
    friend_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inviter_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tag_connect (
    user_id INTEGER,
    article_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user_basic(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES article_basic(article_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- CREATE TRIGGER tag_connect_check BEFORE INSERT
-- ON tag_connect FOR EACH ROW
-- DECLARE MESSAGE_TEXT TEXT
-- BEGIN
--     IF new.user_id IS NULL AND new.article_id IS NULL THEN
--         SIGNAL SQLSTATE '45000'
--             SET MESSAGE_TEXT = 'No User or Article is connecting this tag', MYSQL_ERRNO=1001;
--     END IF;
-- END;

-- CREATE TRIGGER user_default BEFORE INSERT
-- ON user_basic FOR EACH ROW
-- BEGIN
--     INSERT INTO user_info (user_id) VALUES (new.user_id);
-- END;

