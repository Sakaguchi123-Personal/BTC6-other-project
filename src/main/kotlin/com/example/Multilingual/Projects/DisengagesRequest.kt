package com.example.Multilingual.Projects

data class DisengagesRequest(
    val leavingWorkId: Long,
    val workRecordId: Long,
    val leavingStartTime: String,
    val leavingEndTime: String?,
)