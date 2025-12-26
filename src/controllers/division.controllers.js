import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Division from "../models/division.models.js"
import Year from "../models/year.models.js";


const createDivision = asyncHandler(async (req, res)=>{
    const { name,yearId } = req.body;
    if (!name || !name.trim() || !yearId) {
        throw new ApiError(400,`All fields are required`)
    }
    const divisionName = name.trim();
    const parsedYearId = Number(yearId);
    const year = await Year.findByPk(yearId);
    if (!year) {
        throw new ApiError(409,`Year not found`)
    }
    const existingDivision = await Division.findOne({
        where: {
        name: divisionName,
        yearId: parsedYearId
        }
    });

    if (existingDivision) {
        throw new ApiError(409,`Division Already exsting with the Year`)
    }
    const division = await Division.create({
        name: divisionName,
        yearId: parsedYearId
    })
    res
    .status(200)
    .json(new ApiResponse(
        200,
        division,
        `Division created Successfully.`
    ))
})


const getAllDivision = asyncHandler(async (req,res)=>{
    const divisions = await Division.findAll({
        include: {
            model: Year,
            as: "year",
            attributes: ["id", "name", "description"]
        }
    });
    return res.status(200).json(new ApiResponse(
        200,
        divisions,
        `Divisions retrived successfully...`
    ))
})

const getDivisionById = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid division id`)
    }
    const division = await Division.findByPk(id,{
        include: {
            model: Year,
            as: "year",
            attributes: ["id","name","description"]
        }
    });
    if (!division) {
        throw new ApiError(404,`Division not found`)
    }
    res
    .status(200)
    .json(new ApiResponse(
        200,
        division,
        `Division retrived successfully`
    ))
})

const updateDivision = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    const { name,yearId } = req.body;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid division id`)
    }
    const division = await Division.findByPk(id)
    if (!division) {
        throw new ApiError(404,`Division not found`)
    }
    if (name !== undefined) {
        if (!name.trim()) {
            throw new ApiError(400,`name cannot be empty`)
        }
        division.name = name.trim()
    }
    if(yearId !== undefined){
        division.yearId = yearId;
    }
    await division.save();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        division,
        `Division Updated successfully`
    ))
})


const deleteDivision = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    if(!id || isNaN(id)){
        throw new ApiError(400,`Invalid division id`)
    }
    const division = await Division.findByPk(id);
    if (!division) {
        throw new ApiError(404,`Division not found`)
    }
    await division.destroy();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        null,
        `Division deleted successfully`
    ))
})

export {
    createDivision,
    getAllDivision,
    getDivisionById,
    updateDivision,
    deleteDivision
}