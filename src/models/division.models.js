import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Year from "./year.models.js";


const Division = sequelize.define("Division",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    yearId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Year,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
})

export default Division;