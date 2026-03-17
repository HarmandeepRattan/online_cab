const router = require("express").Router()
const cityController = require("../server/city/cityController")
const brandController = require("../server/brand/brandController")
const carController = require("../server/car/carController")
const userController = require("../server/user/userController")
const priceController = require("../server/price/priceController")
const bookingController = require("../server/booking/bookingController")
const feedbackController = require("../server/feedback/feedbackController")
const multer = require("multer")


// diskstorage start for brand
const brandstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, "./public/brand")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const brandupload = multer({ storage: brandstorage })
// diskstorage end of brand

// diskstorage start for car
const carstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, "./public/car")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const carupload = multer({ storage: carstorage })
// diskstorage end of car


router.post("/user/register", userController.register)
router.post("/user/login", userController.login)

// brand
router.post("/brand/getall", brandController.getallData)
router.post("/brand/getsingle", brandController.getsingleData)

// city
router.post("/city/getall", cityController.getallData)
router.post("/city/getsingle", cityController.getsingleData)

// car
router.post("/car/getall", carController.getallData)
router.post("/car/getsingle", carController.getsingleData)

// feedback
router.post("/feedback/getall", feedbackController.getallFeedback)
router.post("/feedback/getsingle", feedbackController.getsingleData)

// price
router.post("/price/getall", priceController.getallPrice)
router.post("/price/getsingle", priceController.getsingleData)

router.use(require("../config/middleware"))

router.post("/booking/add", bookingController.add)
router.post("/booking/getall", bookingController.getallData)
router.post("/booking/getsingle", bookingController.getsingleData)
// router.post("/booking/softdelete", bookingController.softdeleteData)
router.post("/booking/update", bookingController.updateData)

router.post("/brand/add", brandupload.single("brandImage"), brandController.add)
router.post("/brand/softdelete", brandController.softdeleteData)
router.post("/brand/update", brandupload.single("brandImage"), brandController.updateData)

router.post("/car/add", carupload.single("carImage"), carController.add)
router.post("/car/softdelete", carController.softdeleteData)
router.post("/car/update", carupload.single("carImage"), carController.updateData)

router.post("/city/add", cityController.add)
router.post("/city/softdelete", cityController.softdeleteData)
router.post("/city/update", cityController.updateData)

router.post("/feedback/add", feedbackController.add)
router.post("/feedback/softdelete", feedbackController.softdeleteData)
router.post("/feedback/update", feedbackController.updateData)

router.post("/price/add", priceController.add)
router.post("/price/softdelete", priceController.softdeleteData)
router.post("/price/update", priceController.updateData)

router.post("/dashboard", userController.dashBoard)
router.post("/user/changepassword", userController.changePassword)
router.post("/user/updateprofile", userController.updateUser)
router.post("/user/viewprofile", userController.getsingleData)

module.exports = router