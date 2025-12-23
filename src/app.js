import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import healthcheckRouter from "./routes/healthcheck.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js"
import userRouter from "./routes/user.routes.js"
import yearRouter from "./routes/year.routes.js"
import divisionRouter from "./routes/division.routes.js"


app.use("/api/v1/healthcheck" , healthcheckRouter)
app.use("/api/v1/user" , userRouter)
app.use("/api/v1/year" , yearRouter)
app.use("/api/v1/division",divisionRouter)
app.use(errorHandler) 



export { app }