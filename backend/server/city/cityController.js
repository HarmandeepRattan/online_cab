const City = require("./cityModel")

add = (req, res) => {
    var validationerrors = []
    if (!req.body.cityName)
        validationerrors.push("City Name is required")
    if (!req.body.pinCode)
        validationerrors.push("Pincode is required")
    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation Error",
            errors: validationerrors
        })
    }
    else {
        City.findOne({ cityName: req.body.cityName })
            .then(cityData => {
                if (!cityData) {
                    let catObj = new City()
                    catObj.cityName = req.body.cityName
                    catObj.pinCode = req.body.pinCode
                    catObj.save()
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
                                message: "Internal Server Error",
                                error: err.message
                            })
                        })

                }
                else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "Record already exists",
                        data: cityData
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}


getallData = async (req, res) => {
    let totalcount = await City.find(req.body).countDocuments().exec()
    City.find(req.body)
        .sort({ createdAt: -1 })
        .then(cityData => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded",
                total: totalcount,
                data: cityData
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
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
        City.findOne({ _id: req.body._id })
            .then(cityData => {
                if (!cityData) {
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
                        data: cityData
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


softdeleteData = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        City.findOne({ _id: req.body._id })
            .then(cityData => {
                if (!cityData) {
                    res.json({
                        status: 400,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    cityData.status = false
                    cityData.save()
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "record Deleted"
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "internal Server Error",
                                error: err.message
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "internal Server Error",
                    error: err.message
                })
            })
    }
}


updateData = (req, res) => {
    validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (!req.body.cityName)
        validationerror.push("city name is required")
    if (!req.body.pinCode)
        validationerror.push("pin code is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        City.findOne({ _id: req.body._id })
            .then(cityData => {
                if (!cityData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    if (req.body.cityName)
                        cityData.cityName = req.body.cityName
                    if (req.body.pinCode)
                        cityData.pinCode = req.body.pinCode
                    cityData.save()
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
    softdeleteData,
    updateData
}