import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  yearId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  divisionId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  onboarded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Student;
