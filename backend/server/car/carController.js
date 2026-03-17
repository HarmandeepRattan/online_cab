const Car = require("./carModel")

add = (req, res) => {

    console.log(req.file);

    var validationerrors = []
    if (!req.body.brandId)
        validationerrors.push("brand id is required")
    if (!req.body.carName)
        validationerrors.push("car Name is required")
    if (!req.body.carModel)
        validationerrors.push("car model is required")
    if (!req.body.price)
        validationerrors.push("price is required")
    if (!req.body.description)
        validationerrors.push("description is required")
    if (!req.file)
        validationerrors.push("image is required")
    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation Error",
            errors: validationerrors
        })
    }
    else {
        Car.findOne({ carName: req.body.carName })
            .then(carData => {
                if (!carData) {
                    let carObj = new Car()
                    carObj.brandId = req.body.brandId
                    carObj.carName = req.body.carName
                    carObj.carModel = req.body.carModel
                    carObj.description = req.body.description
                    carObj.price = req.body.price
                    carObj.carImage = "car/" + req.file.filename
                    carObj.save()
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
                        data: carData
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
    let totalcount = await Car.find(req.body).countDocuments().exec()
    Car.find(req.body)
        .sort({ created: -1 })
        .populate("brandId")
        .then(carData => {
            res.json({
                status: 200,
                success: true,
                message: "data loaded",
                total: totalcount,
                data: carData
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                message: "internal server error",
                error: err.message
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
        Car.findOne({ _id: req.body._id })
            .then(carData => {
                if (!carData) {
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
                        data: carData
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
        Car.findOne({ _id: req.body._id })
            .then(carData => {
                if (!carData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    carData.status = false
                    carData.save()
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
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        Car.findOne({ _id: req.body._id })
            .then(carData => {
                if (!carData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    if (req.body.brandId)
                        carData.brandId = req.body.brandId
                    if (req.body.carName)
                        carData.carName = req.body.carName
                    if (req.body.carModel)
                        carData.carModel = req.body.carModel
                    if (req.body.description)
                        carData.description = req.body.description
                    if (req.body.price)
                        carData.price = req.body.price
                    if (req.file)
                        carData.carImage = "car/" + req.file.filename
                    carData.save()
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