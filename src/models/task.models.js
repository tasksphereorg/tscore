// models/task.models.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  taskDoc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  divisionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Task;
