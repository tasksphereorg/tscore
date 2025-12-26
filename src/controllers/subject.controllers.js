import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Division from "../models/division.models.js"
import Year from "../models/year.models.js";
import Subject from "../models/subject.models.js"



const createSubject = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new ApiError(400, `Request body is required`);
  }
  const { name, description, yearId } = req.body;
  if (!name || !name.trim() || !yearId) {
    throw new ApiError(400, `Name and yearId are required`);
  }
  const subjectName = name.trim();
  const parsedYearId = Number(yearId);
  const year = await Year.findByPk(parsedYearId);
  if (!year) {
    throw new ApiError(404, `Year not found`);
  }

  const existingSubject = await Subject.findOne({
    where: {
      name: subjectName,
      yearId: parsedYearId
    }
  });
  if (existingSubject) {
    throw new ApiError(409, `Subject already exists for this year`);
  }

  const subject = await Subject.create({
    name: subjectName,
    description: description?.trim() || null,
    yearId: parsedYearId
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      subject,
      `Subject created successfully`
    )
  );
});


const getAllSubjects = asyncHandler(async (req,res)=>{
    const subjects = await Subject.findAll({
        include: {
            model: Year,
            as: "year",
            attributes: ["id","name","description"]
        }
    })
    return res.status(200).json(new ApiResponse(
        200,
        subjects,
        `Subjects retrived successfully...`
    ))
})


const getSubjectById = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid subject id`)
    }
    const subject = await Subject.findByPk(id,{
        include: {
            model: Year,
            as: "year",
            attributes: ["id","name","description"]
        }
    })
    if (!subject) {
        throw new ApiError(404,`Subject not found`)
    }
    res
    .status(200)
    .json(new ApiResponse(
        200,
        subject,
        `Subject retrived successfully....`
    ))
})

const updateSubject = asyncHandler(async (req,res)=>{
    if (!req.body) {
        throw new ApiError(400, `Request body is required`);
    }
    const { id } = req.params;
    const { name, description, yearId } = req.body;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid subject id`)
    }
    const subject = await Subject.findByPk(id)
    if (!subject) {
        throw new ApiError(404,`Subject not found`)
    }
    if (name !== undefined) {
        if (!name.trim()) {
            throw new ApiError(400,`Subject cannot be empty`)
        }
        subject.name = name
    }
    if (description !== undefined) {
        subject.description = description?.trim() || null;
    }
    if (yearId !== undefined) {
        subject.yearId = yearId|| null;
    }
    await subject.save();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        subject,
        `Subject updated successfully`
    ))
})


const deleteSubject = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid subject id`)
    }
    const subject = await Subject.findByPk(id)
    if (!subject) {
        throw new ApiError(404,`Subject not found`)
    }
    await subject.destroy();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        null,
        `Subject deleted successfully`
    ))
})

export {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
}