import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Year from "../models/year.models.js"


const createYear = asyncHandler(async (req,res)=>{
    const { name, description } = req.body;
    if (!name || !name.trim()) {
        throw new ApiError(400,`Year name is required`)
    }
    const yearName = name.trim();
    const existingYear = await Year.findOne({
        where: {name: yearName}
    });
    if (existingYear) {
        throw new ApiError(409, `Year already exists`);
    }
    const year = await Year.create({
        name: name,
        description: description?.trim() || null
    });

    res
    .status(200)
    .json(new ApiResponse(
        200,
        {
            id: year.id,
            name: year.name,
            description: year.description || null
        },
        `Year created successfully`
    ))
})

const getAllYears = asyncHandler(async (req, res) => {
  const years = await Year.findAll();
  return res.status(200).json(
    new ApiResponse(
      200,
      years,
      `Years retrieved successfully`
    )
  );
});

const getYearById = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid year id`)
    }
    const year = await Year.findByPk(id);
    if (!year) {
        throw new ApiError(404,`Year not found`)
    }
    res
    .status(200)
    .json(new ApiResponse(
        200,
        year,
        `Year retrieved successfully`
    ))
})


const updateYear = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id || isNaN(id)) {
        throw new ApiError(400, "Invalid year id");
    }

    const year = await Year.findByPk(id);
    if (!year) {
        throw new ApiError(404,`Year not found`)
    }
    if (name !== undefined) {
        if (!name.trim()) {
            throw new ApiError(400, "Year name cannot be empty");
        }
        year.name = name.trim()
    }
    if (description !== undefined) {
        year.description = description?.trim() || null;
    }
    await year.save();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        year,
        `Year updated successfully`
    ))

})

const deleteYear = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400, "Invalid year id");
    }
    const year = await Year.findByPk(id);
    if (!year) {
        throw new ApiError(404,`Year not found`)
    }
    await year.destroy();
    res
    .status(200)
    .json(new ApiResponse(
        200,
        null,
        `Year deleted successfully`
    ))
})

export{
    createYear,
    getAllYears,
    getYearById,
    updateYear,
    deleteYear
}