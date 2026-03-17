const Price = require("./priceModel")

add = (req, res) => {

    validationerror = []
    if (!req.body.startPointCityId)
        validationerror.push("start point id is required")
    if (!req.body.endPointCityId)
        validationerror.push("end point id is required")
    if (!req.body.price)
        validationerror.push("price is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        let priceObj = new Price()
        priceObj.startPointCityId = req.body.startPointCityId
        priceObj.endPointCityId = req.body.endPointCityId
        priceObj.price = req.body.price
        priceObj.save()
            .then(saveRes => {
                res.json({
                    status: 200,
                    success: true,
                    message: "record inserted",
                    data: saveRes
                })
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


getallPrice = async (req, res) => {
    totalcount = await Price.find(req.body).countDocuments().exec()
    Price.find(req.body)
        .sort({ createdAt: -1 })
        .populate("startPointCityId")
        .populate("endPointCityId")
        .then(priceData => {
            res.json({
                status: 200,
                success: true,
                message: "data loaded",
                total: totalcount,
                data: priceData
            })
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
        Price.findOne({ _id: req.body._id })
            .then(priceData => {
                if (!priceData) {
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
                        data: priceData
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
        Price.findOne({ _id: req.body._id })
            .then(priceData => {
                if (!priceData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    priceData.status = false
                    priceData.save()
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
        Price.findOne({ _id: req.body._id })
            .then(priceData => {
                if (!priceData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    if (req.body.startPointCityId)
                        priceData.startPointCityId = req.body.startPointCityId
                    if (req.body.endPointCityId)
                        priceData.endPointCityId = req.body.endPointCityId
                    if (req.body.price)
                        priceData.price = req.body.price
                    priceData.save()
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
    getallPrice,
    getsingleData,
    softdeleteData,
    updateData
}