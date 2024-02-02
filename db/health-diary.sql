
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id         INT AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50) NOT NULL UNIQUE UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id        INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    entry_date      DATE NOT NULL,
    description     VARCHAR(50),
    weight          DECIMAL(5,2),
    sleep_hours     INT,
    notes           TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for MonthlyAverages
CREATE TABLE MonthlyAverages (
    entry_id                INT AUTO_INCREMENT PRIMARY KEY,
    user_id                 INT NOT NULL,
    calculated_average      INT NOT NULL,
    month_number            INT NOT NULL,
    year                    INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

------------------- Insert mock data into the database -------------------------

INSERT INTO Users (username, password_hash)
VALUES ('Mikko', 'abcdefghijklmnoupgrstu');

INSERT INTO DiaryEntries (user_id, entry_date, description, weight, sleep_hours, notes)
VALUES
(1, '2024-02-02', 'good', 65.00, 7, 'felt good throughout the day'),
(1, '2024-02-01', 'bad', 65.00, 3, 'felt bad throughout the day');

INSERT INTO MonthlyAverages (user_id, calculated_average, month_number, year)
VALUES (1, 6.4, 2, 2024);

------------------------------ Use cases ----------------------------------------

-- Update  - If the user wants to modify the submitted diaryEntry on the same day of submission.
-- delete  - When deleting the application, the user is able to delete their records from the database
-- query   - User wants to view previos logs and see the monthly sleep duration average


