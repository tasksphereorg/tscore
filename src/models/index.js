import sequelize from "../config/database.js";
import Year from "./year.models.js";
import Division from "./division.models.js";


// Association
Year.hasMany(Division,{
  foreignKey: "yearId",
  as: "division"
});

Division.belongsTo(Year,{
  foreignKey: "yearId",
  as: "year"
});

export {
  sequelize,
  Year,
  Division
};