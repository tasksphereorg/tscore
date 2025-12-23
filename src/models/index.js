import sequelize from "../config/database.js";
import Year from "./year.models.js";
import Division from "./division.models.js";
import Subject from "./subject.models.js";


// Association

// ===== YEAR → DIVISION =====
Year.hasMany(Division,{
  foreignKey: "yearId",
  as: "division",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Division.belongsTo(Year,{
  foreignKey: "yearId",
  as: "year"
});



// ===== YEAR → SUBJECT =====
Year.hasMany(Subject,{
  foreignKey: "yearId",
  as: "subject",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Subject.belongsTo(Year,{
  foreignKey: "yearId",
  as: "year"
})

export {
  sequelize,
  Year,
  Division,
  Subject
};