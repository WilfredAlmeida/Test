const supertest = require('supertest')
const app = require('../index.js')
const db = require('../db')

//Connecting mongodb
beforeAll(async () => await db.connect())

//Testing GET report API
test("GET /report", async () => {
    await supertest("http://localhost:4545/")
        .get("report/reports?reportID=622f7fd7d774cfc5c9849efc")
        .expect(200)
        .then(result => {
            expect(
                result &&
                typeof result === 'object' &&
                Object.keys(result).length == 9 &&
                result.price === 15 &&
                result.priceUnit === "Kg"
            )
        })
})

//Testing POST request API
test("POST /report", async () => {
    await await supertest("http://localhost:4545/")
        .post("report/reports")
        .send({
            "userID": "user-2",
            "marketID": "market-151",
            "marketName": "Vashi Navi Mumbai",
            "cmdtyID": "cmdty-1",
            "marketType": "Mandi",
            "cmdtyName": "Potato",
            "priceUnit": "Pack",
            "convFctr": 100,
            "price": 1600
        })
        .expect(200)
        .then(result => {
            expect(
                result &&
                typeof result === 'object' &&
                Object.keys(result).length == 2 &&
                result.status === "success"
            )
        })
})