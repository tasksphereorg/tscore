import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Student from "../models/student.models.js";
import Year from "../models/year.models.js"
import Division from "../models/division.models.js"
import { json } from "sequelize";
import User from "../models/user.models.js"


const onboardStudent = asyncHandler(async (req,res)=>{
    const { yearId, divisionId } = req.body;
    const userId = req.user.id

    if (!yearId || !divisionId) {
        throw new ApiError(400,`Year and Division are required`)
    }

    const year = await Year.findByPk(yearId);
    const division = await Division.findByPk(divisionId)
    if (!year) {
        throw new ApiError(404,`Year not found`)
    }
    if (!division) {
        throw new ApiError(404,`Division not found`)
    }
    const student = await Student.findOne({
        where: { userId }
    })
    if (!student) {
        throw new ApiError(404,`Student Not found`)
    }
    if (student?.onboarded) {
        throw new ApiError(400,`Student already onboarded`)
    }

    student.yearId = yearId;
    student.divisionId = divisionId;
    student.onboarded = true;
    await student.save();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        student,
        `Onboarding completed`
    ))
})



const studentDashboard = asyncHandler(async (req,res)=>{
    const userId = req.user.id
    
    const user = await User.findByPk(userId)

    res
    .status(200)
    .json(new ApiResponse(
        200,
        user,
        `Welcome ${user.name} on Dashboard`
    ))
})

export {
    onboardStudent,
    studentDashboard
}