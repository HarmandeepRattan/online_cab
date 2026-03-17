const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/online_cab')
.then(()=>{
    console.log("Database Connected")
})
.catch(err=>{
    console.log("Unable to connect")
})