package com.example.Multilingual.Projects

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MultilingualProjectsApplicationTests(
    @Autowired val restTemplate: TestRestTemplate,
    @LocalServerPort val port: Int
) {
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------

    val workDate = "2024-05-01"

    fun posts(): Int {
        val requestBody = WorkRecordRequest(1, 1, workDate, 1, "08:00", "18:00", "09:00", "02:30")
        val postResponse =
            restTemplate.postForEntity("http://localhost:$port/api/works", requestBody, String::class.java)
        val postId = postResponse.body!!
        return postId.toInt()
    }

    fun postsLeavingData(postId: Int): Int {
        val requestBody = DisengagesRequest(1, postId.toLong(), "01:00", null)
        val response =
            restTemplate.postForEntity("http://localhost:$port/api/works/disengages", requestBody, String::class.java)
        val leavingPostId = response.body!!
        return leavingPostId.toInt()
    }

    fun deletes(postId: Int): HttpStatusCode {
        val body = DeleteRequest(postId)
        val request =
            RequestEntity.method(HttpMethod.DELETE, "http://localhost:$port/api/works").body(body);
        val send = restTemplate.exchange(request, String::class.java);
        return send.statusCode
    }

    fun getNowTime(): String {
        val currentDateTime = LocalDateTime.now()
        val formatter = DateTimeFormatter.ofPattern("HH:mm")
        val formattedDateTime = currentDateTime.format(formatter)
        return formattedDateTime
    }
    //---------------------------------------------------------------------------------

    @Test
    fun `post request returns ok status`() {
        val requestBody = WorkRecordRequest(1, 1, "2024-05-28", 1, "08:00", "18:00", "09:00", "02:30")
        val response = restTemplate.postForEntity("http://localhost:$port/api/works", requestBody, String::class.java)
        val postId = response.body!!

        //postしたデータがあるか確認
        val db1 =
            restTemplate.getForEntity("http://localhost:$port/api/dates?date={date}", Array::class.java, "2024-05-28")

        //postしたデータを削除
        val deleteRes = deletes(postId.toInt())

        //postしたデータが消えているか確認
        val db2 =
            restTemplate.getForEntity("http://localhost:$port/api/dates?date={date}", Array::class.java, "2024-05-28")

        assertThat(deleteRes, equalTo(HttpStatus.OK))
        assertThat(db1.body!!.size, equalTo(1))
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(db2.body!!.size, equalTo(0))
    }

    //---------------------------------------------------------------------------------

    @Test
    fun `getリクエストはdateと一致したオブジェクトを返す`() {
        //postする
        val postId = posts()

        //postしたデータを取得する
        val getResponse =
            restTemplate.getForEntity(
                "http://localhost:$port/api/dates?date={date}",
                Array<WorkRecordRequest>::class.java,
                workDate
            )
        val obj = getResponse.body!![0]

        //postしたデータを削除
        val deleteRes = deletes(postId)

        assertThat(obj.workRecordId, equalTo(postId.toLong()))
        assertThat(obj.userId, equalTo(1))
        assertThat(obj.workDate, equalTo(workDate))
        assertThat(obj.officeHome, equalTo(1))
        assertThat(obj.startTime, equalTo("08:00"))
        assertThat(obj.endTime, equalTo("18:00"))
        assertThat(obj.workingTime, equalTo("09:00"))
        assertThat(obj.overTime, equalTo("02:30"))
        assertThat(deleteRes, equalTo(HttpStatus.OK))
    }

    //---------------------------------------------------------------------------------
    //ok
    @Test
    fun `出社・在宅を切り替える`() {
        //postする
        val postId = posts()

        //比較するデータを取得
        val req1 = restTemplate.getForEntity(
            "http://localhost:$port/api/dates?date={date}",
            Array<WorkRecordRequest>::class.java,
            workDate
        )
        val res1 = req1.body!![0].officeHome

        //現在のデータと逆のデータを作る
        val patchData = if (res1 == 0.toLong()) {
            1
        } else {
            0
        }

        //patchする
        val requestBody = OfficeHomeRequest(postId.toInt(), patchData)
        val response =
            restTemplate.postForEntity("http://localhost:$port/api/works/office-home", requestBody, String::class.java)

        //patch後のデータを取得
        val req2 = restTemplate.getForEntity(
            "http://localhost:$port/api/dates?date={date}",
            Array<WorkRecordRequest>::class.java,
            workDate
        )
        val res2 = req2.body!![0].officeHome

        //postしたデータを削除
        val deleteRes = deletes(postId)


        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(res2.toInt(), equalTo(patchData))
        assertThat(deleteRes, equalTo(HttpStatus.OK))
    }

    //---------------------------------------------------------------------------------
    //OK!!!!!!!!!
    @Test
    fun `start時間を修正する`() {
        //postする
        val postId = posts()

        //現在時刻を取得
        val formattedDateTime = getNowTime()

        //patchする
        val requestBody = StartTimeRequest(postId.toInt(), formattedDateTime)
        val response =
            restTemplate.postForEntity("http://localhost:$port/api/works/starts", requestBody, String::class.java)

        //patch後のデータを取得
        val req = restTemplate.getForEntity(
            "http://localhost:$port/api/dates?date={date}",
            Array<WorkRecordRequest>::class.java,
            workDate
        )
        val res = req.body!![0].startTime

        //postしたデータを削除
        val deleteRes = deletes(postId)

        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(res, equalTo(formattedDateTime))
        assertThat(deleteRes, equalTo(HttpStatus.OK))

    }

    //---------------------------------------------------------------------------------
    @Test
    fun `end時間を修正する`() {
        //postする
        val postId = posts()

        //現在時刻を取得
        val formattedDateTime = getNowTime()

        //patchする
        val requestBody = EndTimeRequest(postId, formattedDateTime, "09:30", "02:30")
        val response =
            restTemplate.postForEntity("http://localhost:$port/api/works/ends", requestBody, String::class.java)

        //patch後のデータを取得
        val req = restTemplate.getForEntity(
            "http://localhost:$port/api/dates?date={date}",
            Array<WorkRecordRequest>::class.java,
            workDate
        )
        val res = req.body!![0].endTime

        //postしたデータを削除
        val deleteRes = deletes(postId)

        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(res, equalTo(formattedDateTime))
        assertThat(deleteRes, equalTo(HttpStatus.OK))
    }

    //---------------------------------------------------------------------------------
    @Test
    fun `離業時間をポストする`() {
        //postする
        val postId = posts()

        val requestBody = DisengagesRequest(1, postId.toLong(), "01:00", null)
        val response =
            restTemplate.postForEntity("http://localhost:$port/api/works/disengages", requestBody, String::class.java)

        val deleteRes = deletes(postId)
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(deleteRes, equalTo(HttpStatus.OK))
    }

    //---------------------------------------------------------------------------------
    @Test
    fun `離業時間をゲットする`() {
        //postする
        val postId = posts()

        //離業時間をpost
        val leavingPostId = postsLeavingData(postId)

        val response =
            restTemplate.getForEntity(
                "http://localhost:$port/api/works/disengages?workRecordId={workRecordId}",
                Array<DisengagesRequest>::class.java,
                postId
            )
        val obj = response.body!![0]

        //postを削除する
        val deleteRes = deletes(postId)

        println(obj)
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(obj.workRecordId, equalTo(postId.toLong()))
        assertThat(obj.leavingWorkId, equalTo(leavingPostId.toLong()))
        assertThat(obj.leavingEndTime, equalTo(null))
        assertThat(obj.leavingStartTime, equalTo("01:00"))
        assertThat(deleteRes, equalTo(HttpStatus.OK))

    }
    //---------------------------------------------------------------------------------

    @Test
    fun `離業のstart時間を修正`() {
        //postする
        val postId = posts()

        //離業時間をpost
        val leavingPostId = postsLeavingData(postId)

        //現在時刻を取得
        val formattedDateTime = getNowTime()

        //patchする
        val requestBody = DisengagesStartRequest(leavingPostId.toLong(), formattedDateTime)
        val response =
            restTemplate.postForEntity(
                "http://localhost:$port/api/works/disengages/starts",
                requestBody,
                String::class.java
            )

//        patch後のデータを取得
        val req = restTemplate.getForEntity(
            "http://localhost:$port/api/works/disengages?workRecordId={workRecordId}",
            Array<DisengagesRequest>::class.java,
            postId
        )
        val res = req.body!![0].leavingStartTime

        val deleteRes = deletes(postId)
//
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(res, equalTo(formattedDateTime))
        assertThat(deleteRes, equalTo(HttpStatus.OK))
    }

    //---------------------------------------------------------------------------------
    @Test
    fun `離業のend時間を修正`() {
        //postする
        val postId = posts()

        //離業時間をpost
        val leavingPostId = postsLeavingData(postId)

        //現在時刻を取得
        val formattedDateTime = getNowTime()

        //patchする
        val requestBody = DisengagesEndRequest(leavingPostId.toLong(), formattedDateTime)
        val response =
            restTemplate.postForEntity(
                "http://localhost:$port/api/works/disengages/ends",
                requestBody,
                String::class.java
            )

//        patch後のデータを取得
        val req = restTemplate.getForEntity(
            "http://localhost:$port/api/works/disengages?workRecordId={workRecordId}",
            Array<DisengagesRequest>::class.java,
            postId
        )
        val res = req.body!![0].leavingEndTime

        //postをデリートする
        val deleteRes = deletes(postId)


        assertThat(response.statusCode, equalTo(HttpStatus.OK))
        assertThat(res, equalTo(formattedDateTime))
        assertThat(deleteRes, equalTo(HttpStatus.OK))

    }

    //---------------------------------------------------------------------------------
    @Test
    fun `workdateを削除する`() {
        //postする
        val postId = posts()
        //離業時間をpost
        val leavingPostId = postsLeavingData(postId)

        val requestBody = DeleteRequest(postId)
        val request = RequestEntity.method(HttpMethod.DELETE, "http://localhost:$port/api/works").body(requestBody);
        val send = restTemplate.exchange(
            request, String::class.java
        );
        assertThat(
            send.statusCode, equalTo(HttpStatus.OK)
        )
    }

    //---------------------------------------------------------------------------------

}