import sequelize from "../config/database.js";
import Year from "./year.models.js";
import Division from "./division.models.js";
import Subject from "./subject.models.js";
import DivisionSubject from "./divisionSubject.models.js";
import Task from "./task.models.js";

/* ================= YEAR RELATIONS ================= */

Year.hasMany(Division, {
  foreignKey: "yearId",
  as: "divisions",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Division.belongsTo(Year, {
  foreignKey: "yearId",
  as: "year"
});

Year.hasMany(Subject, {
  foreignKey: "yearId",
  as: "subjects",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Subject.belongsTo(Year, {
  foreignKey: "yearId",
  as: "year"
});

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

/* ================= TASK RELATIONS ================= */

// Division → Task
Division.hasMany(Task, {
  foreignKey: "divisionId",
  as: "tasks",
  onDelete: "CASCADE"
});

Task.belongsTo(Division, {
  foreignKey: "divisionId",
  as: "division"
});

// Subject → Task
Subject.hasMany(Task, {
  foreignKey: "subjectId",
  as: "tasks",
  onDelete: "CASCADE"
});

Task.belongsTo(Subject, {
  foreignKey: "subjectId",
  as: "subject"
});

export {
  sequelize,
  Year,
  Division,
  Subject,
  DivisionSubject,
  Task
};
