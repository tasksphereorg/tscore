import sequelize from "../config/database.js";
import Year from "./year.models.js";
import Division from "./division.models.js";
import Subject from "./subject.models.js";
import DivisionSubject from "./divisionSubject.models.js";
import Task from "./task.models.js";
import User from "./user.models.js";
import Student from "./student.models.js";

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

/* ================= Student Relation ================= */

// User → Student
User.hasOne(Student, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE"
})

Student.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
})


// Year → Student
Year.hasMany(Student, {
  foreignKey: "yearId",
  as: "students",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

Student.belongsTo(Year, {
  foreignKey: "yearId",
  as: "year",
  onDelete: "SET NULL"
});


// Division → Student
Division.hasMany(Student, {
  foreignKey: "divisionId",
  as: "students",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

Student.belongsTo(Division, {
  foreignKey: "divisionId",
  as: "division",
  onDelete: "SET NULL"
});

export {
  sequelize,
  Year,
  Division,
  Subject,
  DivisionSubject,
  Task,
  User,
  Student
};
