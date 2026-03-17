const Feedback = require("./feedbackModel")

add = (req, res) => {

    validationerror = []
    if (!req.body.bookingId)
        validationerror.push("Booking id is required")
    if (!req.body.feedbackDescription)
        validationerror.push("Feedback Description is required")
    if (!req.body.rating)
        validationerror.push("Rating  is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error",
            errors: validationerror
        })
    }
    else {
        let feedbackObj = new Feedback()
        feedbackObj.bookingId = req.body.bookingId
        feedbackObj.feedbackDescription = req.body.feedbackDescription
        feedbackObj.rating = req.body.rating
        feedbackObj.save()
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


getallFeedback = async (req, res) => {
    totalcount = await Feedback.find(req.body).countDocuments().exec()
    Feedback.find(req.body)
        .sort({ createdAt: +1 })
        .populate({path:"bookingId", populate:{path:'userId'}})
        .then(feedbackData => {
            res.json({
                status: 200,
                success: true,
                message: "data loaded",
                total: totalcount,
                data: feedbackData
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
        Feedback.findOne({ _id: req.body._id })
            .then(feedbackData => {
                if (!feedbackData) {
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
                        data: feedbackData
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
        Feedback.findOne({ _id: req.body._id })
            .then(feedbackData => {
                if (!feedbackData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    feedbackData.status = false
                    feedbackData.save()
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
        Feedback.findOne({ _id: req.body._id })
            .then(feedbackData => {
                if (!feedbackData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "record not found"
                    })
                }
                else {
                    if (req.body.feedbackDescription)
                        feedbackData.feedbackDescription = req.body.feedbackDescription
                    if (req.body.rating)
                        feedbackData.rating = req.body.rating
                    feedbackData.save()
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
    getallFeedback,
    getsingleData,
    softdeleteData,
    updateData
}