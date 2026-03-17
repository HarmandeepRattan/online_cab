const User = require("./userModel")
const Customer = require("../customer/customerModel")
const bcrypt = require("bcrypt")
const value = 10
const jwt = require("jsonwebtoken")
const secretcode = "Shanky@786"
const Car = require("../car/carModel")
const Brand = require("../brand/brandModel")
const City = require("../city/cityModel")
const Booking = require("../booking/bookingModel")
const Price = require("../price/priceModel")
const Feedback = require("../feedback/feedbackModel")


register = (req, res) => {
    validationerror = []
    if (!req.body.name)
        validationerror.push("Name is Required")
    if (!req.body.email)
        validationerror.push("Email is Required")
    if (!req.body.password)
        validationerror.push("Password is Required")
    if (!req.body.contact)
        validationerror.push("Contact is Required")
    if (!req.body.address)
        validationerror.push("Address is Required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation Error",
            errors: validationerror
        })
    }
    else {
        //Duplicacy check
        User.findOne({ email: req.body.email })
            .then(userData => {
                if (!userData) {
                    //User Model Insert
                    let userObj = new User()
                    userObj.name = req.body.name
                    userObj.email = req.body.email
                    userObj.password = bcrypt.hashSync(req.body.password, value)
                    userObj.save()
                        .then(userSaveRes => {
                            //Insert into Customer Model
                            let customerObj = new Customer()
                            customerObj.name = req.body.name
                            customerObj.email = req.body.email
                            customerObj.password = req.body.password
                            customerObj.contact = req.body.contact
                            customerObj.address = req.body.address
                            customerObj.userId = userSaveRes._id
                            customerObj.save()
                                .then(customerRes => {
                                    res.json({
                                        status: 200,
                                        success: true,
                                        message: "Register Successfully",
                                        data: customerRes
                                    })
                                })

                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server Error",
                                errors: err.message
                            })
                        })
                }
                else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "User already exist with same email address"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server Error",
                    errors: err.message
                })
            })
    }
}


login = (req, res) => {
    var validationerror = []
    if (!req.body.email)
        validationerror.push("Email is required")
    if (!req.body.password)
        validationerror.push("Password is required")
    if (validationerror.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerror
        })
    }
    else {
        // email existance
        User.findOne({ email: req.body.email })
            .then(userData => {
                if (!userData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Email not found"
                    })
                }
                else {
                    //password compare
                    bcrypt.compare(req.body.password, userData.password, function (err, result) {
                        if (!result) {
                            res.json({
                                status: 422,
                                success: false,
                                message: "Invalid password"
                            })
                        }
                        else {

                            // playload section
                            tokenpayload = {
                                _id: userData._id,
                                name: userData.name,
                                email: userData.email,
                                userType: userData.userType
                            }
                            token = jwt.sign(tokenpayload, secretcode)
                            res.json({
                                status: 200,
                                success: true,
                                message: "Login successfully",
                                token: token,
                                data: userData
                            })
                        }
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


dashBoard = async (req, res) => {
    totalCar = await Car.find({ status: true }).countDocuments().exec()
    totalBrand = await Brand.countDocuments().exec()
    totalCity = await City.countDocuments().exec()
    totalBooking = await Booking.countDocuments().exec()
    totalPrice = await Price.countDocuments().exec()
    totalFeedback = await Feedback.countDocuments().exec()
    totalCustomer = await Customer.countDocuments().exec()
    res.json({
        status: 200,
        success: true,
        message: "Dashboard Loaded",
        data:{
            totalCar: totalCar,
            totalBrand: totalBrand,
            totalCity: totalCity,
            totalBooking: totalBooking,
            totalPrice: totalPrice,
            totalFeedback: totalFeedback,
            totalCustomer: totalCustomer
        }
    })
}


changePassword = (req, res) => {
    var validationerrors = []
    if (!req.body.oldpassword)
        validationerrors.push("Old password is required")
    if (!req.body.newpassword)
        validationerrors.push("New password is required")
    if (!req.body.confirmpassword)
        validationerrors.push("Confirm password is required")
    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation Errors",
            errors: validationerrors
        })
    }
    else {
        //get token id
        userId = req['decoded']._id
        User.findOne({ _id: userId })
            .then(userData => {
                if (!userData) {
                    //user not found
                    res.json({
                        status: 404,
                        success: false,
                        message: "User Not found"
                    })
                }
                else {
                    bcrypt.compare(req.body.oldpassword, userData.password, function (err, result) {
                        if (!result) {
                            res.json({
                                status: 422,
                                success: false,
                                message: "Old Password doesn`t matched "
                            })
                        }
                        else {
                            if (req.body.newpassword == req.body.confirmpassword) {
                                //update password
                                userData.password = bcrypt.hashSync(req.body.newpassword, value)
                                userData.save()

                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Password Updated"
                                })
                            }
                            else {
                                res.json({
                                    status: 422,
                                    success: false,
                                    message: "New password and confirm password not matched"
                                })
                            }
                        }
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Errors",
                    errors: err.message
                })
            })
    }
}


updateUser = (req, res) => {
    validationerrors = []
    if (!req.body._id)
        validationerrors.push("Id is Required")
    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validaition errors",
            errors: validationerrors
        })
    }
    else {
        Customer.findOne({ userId: req.body._id })
            .then(customerData => {
                if (!customerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "User not found"
                    })
                } else {
                    //update data
                    if (req.body.name)
                        customerData.name = req.body.name
                    if (req.body.email)
                        customerData.email = req.body.email
                    if (req.body.contact)
                        customerData.contact = req.body.contact
                    if (req.body.address)
                        customerData.address = req.body.address
                    customerData.save()
                        .then((customerData) => {
                            User.findOne({ _id: req.body._id })
                                .then((userData) => {
                                    if (req.body.name)
                                        userData.name = req.body.name
                                    if (req.body.email)
                                        userData.email = req.body.email
                                    userData.save()
                                    res.json({
                                        status: 200,
                                        success: true,
                                        message: "User Updated",
                                        data:customerData
                                    })
                                    
                                })
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
        Customer.findOne({ userId: req.body._id })
            .then(userData => {
                if (!userData) {
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
                        data: userData
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
    register,
    login,
    dashBoard,
    changePassword,
    updateUser,
    getsingleData
}