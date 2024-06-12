CREATE TABLE work_record(
    workRecordId SERIAL PRIMARY KEY,
    userId INTEGER,
    workDate TEXT,
    officeHome INTEGER,
    startTime TEXT,
    endTime TEXT ,
    workingTime TEXT,
    overTime TEXT,
    FOREIGN KEY (userId) REFERENCES users(userId)
)