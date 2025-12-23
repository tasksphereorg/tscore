import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Year from "./year.models.js";

const Subject = sequelize.define("Subject",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    yearId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


export default Subject;