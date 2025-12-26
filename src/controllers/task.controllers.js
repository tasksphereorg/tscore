import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Division from "../models/division.models.js"
import Subject from "../models/subject.models.js"
import Task from "../models/task.models.js"
import DivisionSubject from "../models/divisionSubject.models.js";
import { json } from "sequelize";


const createTask = asyncHandler(async (req, res) => {
  const { title, description, deadline, taskDoc, subjectId, divisionId } = req.body;
  if (!title || !title.trim()) {
    throw new ApiError(400, "Task title is required");
  }
  if (!divisionId) {
    throw new ApiError(400, "divisionId is required");
  }

  const division = await Division.findByPk(divisionId);
  if (!division) {
    throw new ApiError(404, "Division not found");
  }
  if (subjectId) {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw new ApiError(404, "Subject not found");
    }
    const exists = await DivisionSubject.findOne({
      where: { divisionId, subjectId }
    });

    if (!exists) {
      throw new ApiError(
        400,
        "Subject is not allotted to this division"
      );
    }
  }

  const task = await Task.create({
    title: title.trim(),
    description: description?.trim() || null,
    deadline: deadline || null,
    taskDoc: taskDoc || null,
    subjectId: subjectId || null,
    divisionId
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      task,
      "Task created successfully"
    )
  );
});



const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    throw new ApiError(400, "Invalid task id");
  }

  const task = await Task.findByPk(id, {
    include: [
      { model: Subject, as: "subject", attributes: ["id", "name"] },
      { model: Division, as: "division", attributes: ["id", "name"] }
    ]
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json(
    new ApiResponse(200, task, "Task retrieved successfully")
  );
});


const getAllTaskBySubjectDivision = asyncHandler(async (req,res)=>{
    const { subjectId,divisionId } = req.query;
    if (!subjectId && !divisionId) {
        throw new ApiError(400,`subjectId or divisionId is required`)
    }
    const where = {};
    if(divisionId) where.divisionId = divisionId;
    if(subjectId) where.subjectId = subjectId;

    const tasks = await Task.findAll({
        where,
        include: [
            { model: Subject, as: "subject", attributes: ["id","name"] },
            { model: Division, as: "division", attributes: ["id","name"]}
        ],
        order: [["createdAt","DESC"]]
    });
    if (!tasks) {
        throw new ApiError(404,`Not task found`)
    }
    res
    .status(200)
    .json(new ApiResponse(
        200,
        tasks,
        `Tasks retrieved successfully`
    ))
})


const updateTask = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    const { title, description, deadline,taskDoc,subjectId,divisionId } = req.body;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid task id`)
    }

    const task = await Task.findByPk(id);
    if(!task){
        throw new ApiError(404,`Task not found`)
    }
    if (title !== undefined) {
        if(!title.trim()){
            throw new ApiError(400, "Title cannot be empty");
        }
        task.title = title.trim();
    }

    if (description !== undefined) {
        task.description = description.trim() || null;
    }
    if (deadline !== undefined) {
        task.deadline = deadline || null
    }
    if ( taskDoc !== undefined ){
        task.taskDoc = taskDoc || null
    }
    if ( subjectId !== undefined) {
        const subject = await Subject.findByPk(subjectId);
        if (!subject) {
            throw new ApiError(404,`Subject not found`)
        }
        task.subjectId = subjectId || null;
    }
    if ( divisionId !== undefined) {
        const division = await Division.findByPk(divisionId);
        if (!division) {
            throw new ApiError(404,`Division not found`)
        }
        task.divisionId = divisionId || null;
    }

    await task.save()
    res
    .status(200)
    .json(new ApiResponse(
        200,
        task,
        `Task updated successfully`
    ))
})

const deleteTask = asyncHandler(async (req,res)=>{
    console.log(`Request Came to the API logic`);
    
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid task id`)
    }
    const deleted = await Task.destroy({
        where: { id }
    })
    if (!deleted) {
        throw new ApiError(404,`Task not found`)
    }
    res
    .status(200)
    .json(new ApiResponse(
        200,
        null,
        `Task deleted successfully`
    ))
})

export {
    createTask,
    getTaskById,
    getAllTaskBySubjectDivision,
    updateTask,
    deleteTask
}