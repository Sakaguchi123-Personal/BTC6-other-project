package com.example.Multilingual.Projects

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class WorkRecordRowMapper : RowMapper<WorkRecordRequest> {
    override fun mapRow(rs: ResultSet, rowNum: Int): WorkRecordRequest? {
        return WorkRecordRequest(
            rs.getLong("workRecordId"),
            rs.getLong("userId"),
            rs.getString("workDate"),
            rs.getLong("officeHome"),
            rs.getString("startTime"),
            rs.getString("endTime"),
            rs.getString("workingTime"),
            rs.getString("overTime")
        )
    }
}

@Component
class LeavingWorkRowMapper : RowMapper<DisengagesRequest> {
    override fun mapRow(rs: ResultSet, rowNum: Int): DisengagesRequest? {
        return DisengagesRequest(
            rs.getLong("leavingWorkId"),
            rs.getLong("workRecordId"),
            rs.getString("leavingStartTime"),
            rs.getString("leavingEndTime")
        )
    }
}

@Repository
class WorkRecordRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val workRecordRowMapper: WorkRecordRowMapper,
    @Autowired val leavingWorkRowMapper: LeavingWorkRowMapper
) {

    //---------------------------------------------------------------------------------
    //データを登録する
    fun saveWorkRecord(workRecordRequest: WorkRecordRequest): Int? {
        jdbcTemplate.update(
            "INSERT INTO work_record (userId, workDate ,officeHome ,startTime ,endTime ,workingTime ,overTime) VALUES (?, ?, ?, ?, ?, ?, ?)",
            workRecordRequest.userId,
            workRecordRequest.workDate,
            workRecordRequest.officeHome,
            workRecordRequest.startTime,
            workRecordRequest.endTime,
            workRecordRequest.workingTime,
            workRecordRequest.overTime
        )
        val id = jdbcTemplate.queryForObject("SELECT lastval()", Int::class.java)

        return id
    }

    //---------------------------------------------------------------------------------
    //指定されたdateのworkDateを返す
    fun fetchWorkRecord(datesRequest: String): List<WorkRecordRequest> {
        return try {
            val workRecords = jdbcTemplate.query(
                "SELECT * FROM work_record WHERE workDate = ?",
                workRecordRowMapper,
                datesRequest
            )
            workRecords
        } catch (ex: EmptyResultDataAccessException) {
            emptyList()
        }

    }

    //---------------------------------------------------------------------------------

    //deleteリクエスト
    fun deleteRequest(deleteRequest: DeleteRequest): Int? {
        jdbcTemplate.update(
            "DELETE FROM leaving_work WHERE workRecordId = ?",
            deleteRequest.workRecordId
        )
        val patch = jdbcTemplate.update(
            "DELETE FROM work_record WHERE workRecordId = ?",
            deleteRequest.workRecordId
        )

        return patch
    }

    //---------------------------------------------------------------------------------

    //出社・在宅を切り替える
    fun patchOfficeHome(officeHomeRequest: OfficeHomeRequest): Int {
        val patch = jdbcTemplate.update(
            "UPDATE work_record SET officeHome = ? WHERE workRecordId = ?",
            officeHomeRequest.officeHome,
            officeHomeRequest.workRecordId
        )

        return patch
    }

    //---------------------------------------------------------------------------------
    //出勤時間の編集
    fun patchStartTime(startTimeRequest: StartTimeRequest): Int {
        val patch = jdbcTemplate.update(
            "UPDATE work_record SET startTime = ? WHERE workRecordId = ?",
            startTimeRequest.startTime,
            startTimeRequest.workRecordId
        )

        return patch
    }

    //---------------------------------------------------------------------------------
    //退勤時間の編集
    fun patchEndTime(endTimeRequest: EndTimeRequest): Int {
        val patch = jdbcTemplate.update(
            "UPDATE work_record SET endTime = ?, workingTime = ?, overTime = ? WHERE workRecordId = ?",
            endTimeRequest.endTime,
            endTimeRequest.workingTime,
            endTimeRequest.overTime,
            endTimeRequest.workRecordId
        )

        return patch
    }

    //---------------------------------------------------------------------------------
    //離業テーブルにpost
    fun disengagesRequest(disengagesRequest: DisengagesRequest): Int? {
        val patch = jdbcTemplate.update(
            "INSERT INTO leaving_work (leavingStartTime, leavingEndTime, workRecordId) VALUES (?, ?, ?)",
            disengagesRequest.leavingStartTime,
            disengagesRequest.leavingEndTime,
            disengagesRequest.workRecordId
        )

        val id = jdbcTemplate.queryForObject("SELECT lastval()", Int::class.java)
        return id
    }

    //---------------------------------------------------------------------------------
    //離業時間をgetする
    fun disengagesGetRecord(workRecordId: Int): List<DisengagesRequest> {
        return try {
            val res = jdbcTemplate.query(
                "SELECT * FROM leaving_work WHERE workRecordId = ?",
                leavingWorkRowMapper,
                workRecordId
            )
            res
        } catch (ex: EmptyResultDataAccessException) {
            emptyList()
        }
    }

    //---------------------------------------------------------------------------------
    //離業開始時間の編集
    fun disengagesStartRequest(disengagesStartRequest: DisengagesStartRequest): Int? {
        println(disengagesStartRequest)
        val patch = jdbcTemplate.update(
            "UPDATE leaving_work SET leavingStartTime = ? WHERE leavingWorkId = ?",
            disengagesStartRequest.leavingStartTime,
            disengagesStartRequest.leavingWorkId,
        )
        return patch
    }

    //---------------------------------------------------------------------------------
    //離業終了時間の編集
    fun disengagesEndRequest(disengagesEndRequest: DisengagesEndRequest): Int? {
        val patch = jdbcTemplate.update(
            "UPDATE leaving_work SET leavingEndTime = ? WHERE leavingWorkId = ?",
            disengagesEndRequest.leavingEndTime,
            disengagesEndRequest.leavingWorkId,
        )

        return patch
    }

    //---------------------------------------------------------------------------------
}