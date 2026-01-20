import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Reminder = sequelize.define("Reminder",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
})