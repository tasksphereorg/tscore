import dotenv from "dotenv";
import { app } from "./app.js";
import { sequelize } from "../src/models/index.js"

dotenv.config({
    path: "../.env"
})


sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("DB error:", err));


sequelize.sync({ alter: true })
  .then(() => console.log("Models synced"));

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`server is running the server on ${PORT}`);
})
