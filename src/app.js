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

const baseUrl = "/api/v1"



import healthcheckRouter from "./routes/healthcheck.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js"
import userRouter from "./routes/user.routes.js"
import yearRouter from "./routes/year.routes.js"
import divisionRouter from "./routes/division.routes.js"
import subjectRouter from "./routes/subjects.routes.js"
import taskRouter from "./routes/task.routes.js"
import studentRouter from "./routes/student.routes.js"

app.use(`${baseUrl}/healthcheck` , healthcheckRouter)
app.use(`${baseUrl}/user` , userRouter)
app.use(`${baseUrl}/year` , yearRouter)
app.use(`${baseUrl}/division`,divisionRouter)
app.use(`${baseUrl}/subject`,subjectRouter)
app.use(`${baseUrl}/task`,taskRouter)
app.use(`${baseUrl}/student`,studentRouter)


app.use(errorHandler) 



export { app }