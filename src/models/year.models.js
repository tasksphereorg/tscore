import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Year = sequelize.define("Year",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})


export default Year;