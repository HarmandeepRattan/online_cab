const User = require("../server/user/userModel")
const bcrypt = require("bcrypt")
const value = 10

adminSeeder = () => {
    User.findOne({ email: "admin@gmail.com" })
        .then(userdata => {
            if (!userdata) {
                let userObj = new User()
                userObj.name = "Admin"
                userObj.email = "admin@gmail.com"
                userObj.userType = 1
                userObj.password = bcrypt.hashSync('123', value)
                userObj.save()
                    .then(userSaveRes => {
                        console.log("Admin seeded successfully")
                    })
                    .catch(err => {
                        console.log("Admin not seeded successfully")
                    })
            }
            else {
                console.log("Admin already exist with same email address")
            }
        })
        .catch(err => {
            console.log("Admin not seeded succssfully")
        })
}
 

   

module.exports = {
    adminSeeder
}