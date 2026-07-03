const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require('cors')
const app = express()

const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.includes('render.com')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


const authRoutes = require('./routes/auth.routes')
const interviewRoutes = require('./routes/interview.routes')

app.use("/api/auth",authRoutes)
app.use("/api/interview",interviewRoutes)

module.exports = app     