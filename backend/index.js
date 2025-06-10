import express from "express"
import cookieParser from "cookie-parser" // used to parse token coming from the frontend
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config({})
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
    origin: [
        'http://localhost:5173',               // for local dev
        'https://workify-one.vercel.app'       // your deployed frontend
    ],
    credentials: true
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000

// api's
app.use('/api/user',userRoute)
app.use('/api/company',companyRoute)
app.use('/api/job',jobRoute)
app.use('/api/application',applicationRoute)
app.get("/", (req, res) => {
  res.send("Backend is live!");
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})