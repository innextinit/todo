const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const {PORT} = process.env
const {DATABASE_URL} = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// database connection
try {
  const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  }
  
  mongoose.connect(DATABASE_URL, options)
  console.log(`>>> Conneced to MongoDB database ${DATABASE_URL}`)
} catch (error) {
  console.log("<<< Could not connect to a database", error)
}

// session
app.use(cookieParser())
app.use(expressSession({ 
  secret: process.env.SESSION_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 12 * 1000} //12 mins
}))

// header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const indexRouter = require("./routes/index")

app.use("/", indexRouter)

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT} http://localhost:${PORT}`)
})

module.exports = app