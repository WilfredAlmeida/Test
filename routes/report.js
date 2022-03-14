const router = require("express").Router();
const ReportDetails = require("../models/ReportDetails");

//POST request to add report data on server
router.post("/reports", async (req, res) => {


    //If report already exists, update it. Else make a new one
    ReportDetails.findOne({ "marketID": req.body.marketID, "cmdtyID": req.body.cmdtyID }, async (err, result) => {

        //Report does not exist, making a new one
        if (result == null) {

            //Object as per schema
            const report = new ReportDetails({
                cmdtyName: req.body.cmdtyName,
                cmdtyID: req.body.cmdtyID,
                marketID: req.body.marketID,
                marketName: req.body.marketName,
                users: [req.body.userID],
                timestamp: Math.floor(new Date().getTime() / 1000),
                priceUnit: "Kg",
                price: Math.floor(req.body.price / req.body.convFctr)
            })

            //Saving and Error Handling
            report.save().then((result) => {
                //Sending Response
                res.status(200).json({ status: "success", reportID: result._id })
            }).catch((err2) => {
                res.status(400).json({ status: "failure", reportID: null })
            })
        }
        //Report Exists, updating it
        else {

            //If userID already exists, no need for update, if it doesn't exist, add it
            if (result.users.indexOf(req.body.userID) === -1) {

                result.users.push(req.body.userID) //Pushing userID to users array

                result.price = Math.floor((result.price + Math.floor(req.body.price / req.body.convFctr)) / 2) //Price as per condition

                result.timestamp = Math.floor(new Date().getTime() / 1000)//Report creation/Updation timestamp

                ReportDetails.updateOne({ _id: result._id }, result).then((re) => {
                    res.status(200).json({ status: "success", reportID: result._id })
                }).catch((err2) => {
                    res.status(400).json({ status: "failure", reportID: null })
                })
            }
            //Returning succes since entry already exists
            else {
                res.status(200).json({ status: "success", reportID: result._id })
            }
        }
    })
})


//GET request to get report as per reportID
router.get("/reports", async (req, res) => {
    //Search for doc with given ID
    ReportDetails.findById(req.query.reportID).then((result) => {
        //Found the record. Returning it as needed
        res.status(200).json({
            _id: result._id,
            cmdtyName: result.cmdtyName,
            cmdtyID: result.cmdtyID,
            marketID: result.marketID,
            marketName: result.marketName,
            users: result.users,
            timestamp: result.timestamp,
            priceUnit: result.priceUnit,
            price: result.price
        });
    })
    .catch((err) => {
        //Not Found/Error Occured
         res.status(400).json({ "status": "failure", "message": "Invalid reportID or Error Occurred" })
    })
})

module.exports = router;