package com.example.Multilingual.Projects

data class WorkRecordRequest(
    val workRecordId: Long?,
    val userId: Long,
    val workDate: String,
    val officeHome: Long,
    val startTime: String,
    val endTime: String?,
    val workingTime: String?,
    val overTime: String?
)