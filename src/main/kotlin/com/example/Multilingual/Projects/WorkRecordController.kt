package com.example.Multilingual.Projects

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class WorkRecordController(@Autowired val workRecordRepository: WorkRecordRepository) {

    @PostMapping("/api/works")
    fun controllerWorkRecordRequest(@RequestBody workRecordRequest: WorkRecordRequest): Int? {
        val res = workRecordRepository.saveWorkRecord(workRecordRequest)
        return res
    }

    @GetMapping("/api/dates")
    fun controllerFetchWorkRecord(@RequestParam date: String): List<WorkRecordRequest> {
        val res = workRecordRepository.fetchWorkRecord(date)
        return res
    }

    @DeleteMapping("/api/works")
    fun controllerDeleteRequest(@RequestBody deleteRequest: DeleteRequest): Int? {
        val res = workRecordRepository.deleteRequest(deleteRequest)
        return res
    }

    @PostMapping("/api/works/office-home")
    fun controllerPatchOfficeHome(@RequestBody officeHomeRequest: OfficeHomeRequest): Int {
        val res = workRecordRepository.patchOfficeHome(officeHomeRequest)
        return res
    }

    @PostMapping("/api/works/starts")
    fun controllerPatchStartTime(@RequestBody startTimeRequest: StartTimeRequest): Int {
        val res = workRecordRepository.patchStartTime(startTimeRequest)
        return res
    }

    @PostMapping("/api/works/ends")
    fun controllerPatchEndTime(@RequestBody endTimeRequest: EndTimeRequest): Int {
        val res = workRecordRepository.patchEndTime(endTimeRequest)
        return res
    }

    //離業
    @PostMapping("/api/works/disengages")
    fun controllerDisengagesRequest(@RequestBody disengagesRequest: DisengagesRequest): Int? {
        val res = workRecordRepository.disengagesRequest(disengagesRequest)
        return res
    }

    @GetMapping("/api/works/disengages")
    fun controllerDisengagesGetRecord(@RequestParam workRecordId: Int): List<DisengagesRequest> {
        val res = workRecordRepository.disengagesGetRecord(workRecordId)
        return res
    }

    @PostMapping("/api/works/disengages/starts")
    fun controllerDisengagesStartRequest(@RequestBody disengagesStartRequest: DisengagesStartRequest): Int? {
        val res = workRecordRepository.disengagesStartRequest(disengagesStartRequest)
        return res
    }

    @PostMapping("/api/works/disengages/ends")
    fun controllerDisengagesEndRequest(@RequestBody disengagesEndRequest: DisengagesEndRequest): Int? {
        val res = workRecordRepository.disengagesEndRequest(disengagesEndRequest)
        return res
    }
}