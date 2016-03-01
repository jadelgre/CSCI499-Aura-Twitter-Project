DROP TABLE IF EXISTS tweetTable;
CREATE TABLE tweetTable (USERID INT, MESSAGE VARCHAR(255), DATE TIMESTAMP);
INSERT INTO tweetTable VALUES (0, 'hello world! This is my first tweet!', CURRENT_TIMESTAMP);
SELECT * FROM tweetTable;


DROP TABLE IF EXISTS userTable;
CREATE TABLE userTable (USERID INT PRIMARY KEY, NAME VARCHAR(255), IMGURL VARCHAR(255), SUMMARY VARCHAR(255));
INSERT INTO userTable VALUES (0, 'root', '/img/avatar1.jpg', 'I. am. root');
ALTER TABLE tweetTable ADD FOREIGN KEY (USERID) REFERENCES userTable(USERID);