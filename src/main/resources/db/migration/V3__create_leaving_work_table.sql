CREATE TABLE leaving_work(
    leavingWorkId SERIAL PRIMARY KEY,
    workRecordId INTEGER,
    leavingStartTime TEXT,
    leavingEndTime TEXT ,
    FOREIGN KEY (workRecordId) REFERENCES work_record(workRecordId)
)