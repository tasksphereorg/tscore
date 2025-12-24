import sequelize from "../config/database.js";
import Year from "./year.models.js";
import Division from "./division.models.js";
import Subject from "./subject.models.js";
import DivisionSubject from "./divisionSubject.models.js";


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



/* ================= DIVISION ↔ SUBJECT ================= */

Division.belongsToMany(Subject, {
  through: DivisionSubject,
  foreignKey: "divisionId",
  otherKey: "subjectId",
  as: "subjects"
});

Subject.belongsToMany(Division, {
  through: DivisionSubject,
  foreignKey: "subjectId",
  otherKey: "divisionId",
  as: "divisions"
});



export {
  sequelize,
  Year,
  Division,
  Subject,
  DivisionSubject
};