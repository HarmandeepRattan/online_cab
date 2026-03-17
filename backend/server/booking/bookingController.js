const Booking = require("./bookingModel")
const Car = require("../car/carModel")

add = async (req, res)  => {
    validationerror = []
    if (!req.body.carId)
        validationerror.push("car id is required")
    if (!req.body.priceId)
        validationerror.push("price id is required")
    if (!req.body.userId)
        validationerror.push("user id is required")
    if (!req.body.bookingDate)
        validationerror.push("booking Date is required")
    if (!req.body.bookingRate)
        validationerror.push("booking rate is required")
    if (!req.body.pickupAddress)
        validationerror.push("booking rate is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        let carData =await Car.findOne({_id:req.body.carId})
        if(carData!=null){
        let bookObj = new Booking()
        bookObj.brandId = carData.brandId
        bookObj.carId = req.body.carId
        bookObj.priceId = req.body.priceId
        bookObj.userId = req.body.userId
        bookObj.bookingDate = req.body.bookingDate
        bookObj.bookingRate = req.body.bookingRate
        bookObj.pickupAddress = req.body.pickupAddress
        bookObj.save()
            .then(saveRes => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Record inserted",
                    data: saveRes
                })
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    errors: err.message
                })
            })

        }
        else{
            res.send({
                success:false,
                status:400,
                message:"Car Data Does Not Exist"
            })
        }
    }
}


getallData = async (req, res) => {
    totalcount = await Booking.find(req.body).countDocuments().exec()
    Booking.find(req.body)
        .sort({ createdAt: -1 })
        .populate("brandId")
        .populate("carId")
        .populate({path:"priceId", populate:"startPointCityId endPointCityId"})
        .populate("userId")
        .then(bookingData => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded",
                total: totalcount,
                data: bookingData
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                errors: err.message
            })
        })


}

getsingleData = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        Booking.findOne({ _id: req.body._id })
            .then(bookingData => {
                if (!bookingData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "data loaded",
                        data: bookingData
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "internal server error",
                    errors: err.message
                })
            })
    }
}

updateData = (req, res) => {
    validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (!req.body.status)
        validationerror.push("status is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        Booking.findOne({ _id: req.body._id })
            .then(bookingData => {
                if (!bookingData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    if (req.body.status)
                        bookingData.status = req.body.status
                    bookingData.save()
                        .then(saveRes => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "record updated",
                                data: saveRes
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "internal server error",
                    errors: err.message
                })
            })
    }
}


module.exports = {
    add,
    getallData,
    getsingleData,
    updateData
}