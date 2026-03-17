const express = require("express")
const app = express()
const port = 7000
const config = require("./config/db")
const cors = require("cors")


app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: "50mb" }))
app.use(express.static(__dirname + "/public/"))

const routes = require("./routes/api")
app.use("/api", routes)

app.post("/", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "First API works"
    })
})

app.post("/home", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "Home page API Works"
    })
})

app.post("/about", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "About page API Works"
    })
})

app.post("/pricing", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "Pricing page API Works",
    })
})

app.post("/ourcar", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "Our Car page API Works",
    })
})

app.post("/blog", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "Blog page API Works",
    })
})

app.post("/contact", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "Contact page API Works",
    })
})

app.use("//", (req, res) => {
    res.json({
        status: 404,
        success: false,
        message: "Route not found"
    })
})

const seeder = require("./config/seeder")
seeder.adminSeeder()

app.listen(port, () => {
    console.log("server running at port " + port)
})