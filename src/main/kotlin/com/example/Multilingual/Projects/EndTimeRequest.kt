package com.example.Multilingual.Projects

data class EndTimeRequest(
    val workRecordId: Int,
    val endTime: String,
    val workingTime: String,
    val overTime: String?
)
