const brandModel = require("./brandModel")
const Brand = require("./brandModel")

add = (req, res) => {

    // console.log(req.file);

    var validationerrors = []
    if (!req.body.brandName)
        validationerrors.push("brand Name is required")
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
        Brand.findOne({ brandName: req.body.brandName })
            .then(brandData => {
                if (!brandData) {
                    let brandObj = new Brand()
                    brandObj.brandName = req.body.brandName
                    brandObj.logo = "brand/" + req.file.filename
                    brandObj.save()
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
                        data: brandData
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
    let totalcount = await Brand.find(req.body).countDocuments().exec()
    Brand.find(req.body)
        .sort({ created: -1 })
        .then(brandData => {
            res.json({
                status: 200,
                success: true,
                message: "data loaded",
                total: totalcount,
                data: brandData
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
        Brand.findOne({ _id: req.body._id })
            .then(brandData => {
                if (!brandData) {
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
                        data: brandData
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
        Brand.findOne({ _id: req.body._id })
            .then(brandData => {
                if (!brandData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    brandData.status = false
                    brandData.save()
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
        Brand.findOne({ _id: req.body._id })
            .then(brandData => {
                if (!brandData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    if (req.body.brandName)
                        brandData.brandName = req.body.brandName
                    if (req.file)
                        brandData.logo = "brand/" + req.file.filename

                    brandData.save()
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