const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const dotenv = require("dotenv")
dotenv.config()
const {PORT} = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


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
const todoRouter = require("./routes/todo")

app.use("/", indexRouter)
app.use("/todo", todoRouter)

app.listen(PORT, async () => {
    await require("./database/mongodb-config")()
    console.log(`server listening on PORT ${PORT} http://localhost:${PORT}`)
})

module.exports = app