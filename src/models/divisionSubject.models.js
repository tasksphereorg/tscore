import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const DivisionSubject = sequelize.define("DivisionSubject", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  divisionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ["divisionId", "subjectId"]
    }
  ]
});

export default DivisionSubject;