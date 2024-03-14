
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE users (
    user_id         INT AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50) NOT NULL UNIQUE UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries
CREATE TABLE diaryentries (
    entry_id        INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    entry_date      DATE NOT NULL,
    description     VARCHAR(50),
    weight          DECIMAL(5,2),
    sleep_hours     INT,
    notes           TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create a table for MonthlyAverages
CREATE TABLE monthlyaverages (
    entry_id                INT AUTO_INCREMENT PRIMARY KEY,
    user_id                 INT NOT NULL,
    calculated_average      INT NOT NULL,
    month_number            INT NOT NULL,
    year                    INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

