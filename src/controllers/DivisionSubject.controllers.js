import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Division from "../models/division.models.js"
import DivisionSubject from "../models/divisionSubject.models.js";
import Subject from "../models/subject.models.js";


const allotSubjectToDivision = asyncHandler(async (req,res)=>{
    const { subjectId, divisionId } = req.body;
    if (!subjectId || !divisionId) {
        throw new ApiError(400,`divisionId and subjectId are required`)
    }
    const division = await Division.findByPk(divisionId);
    const subject = await Subject.findByPk(subjectId);
    if (!division || !subject) {
        throw new ApiError(404,`Division or Subject not found`)
    }

    const existing = await DivisionSubject.findOne({
        where: { divisionId, subjectId }
    });

    if (existing) {
        throw new ApiError(409, `Subject already allotted to this division`);
    }

    await division.addSubject(subject);
    res
    .status(200)
    .json(new ApiResponse(
        200,
        null,
        `Subject allotted to division successfully`
    ))
})

const getDivisionSubjects = asyncHandler(async (req,res)=>{
    const { id } = req.params;
    if (!id || isNaN(id)) {
        throw new ApiError(400,`Invalid Division id`)
    } 
    const division = await Division.findByPk(id,{
        include: {
            model: Subject,
            as: "subjects",
            attributes: ["id", "name"]
        }
    })
    if (!division) {
        throw new ApiError(404,`Division not found`)
    }
    res
    .status(200)
    .json(new ApiResponse(
        200,
        division,
        `Division with subjects fetched`
    ))
})

const removeSubjectFromDivision = asyncHandler(async (req, res) => {
  const { divisionId, subjectId } = req.body;
  if (!divisionId || !subjectId) {
    throw new ApiError(400, `divisionId and subjectId are required`);
  }
  const deleted = await DivisionSubject.destroy({
    where: { divisionId, subjectId }
  });
  if (!deleted) {
    throw new ApiError(404, `Allotment not found`);
  }
  return res.status(200).json(
    new ApiResponse(200, null, `Subject removed from division`)
  );
});



const copySubjectsBetweenDivisions = asyncHandler(async (req, res) => {
  const { fromDivisionId, toDivisionId } = req.body;
  if (!fromDivisionId || !toDivisionId) {
    throw new ApiError(400, "fromDivisionId and toDivisionId are required");
  }

  if (fromDivisionId === toDivisionId) {
    throw new ApiError(400, "Source and target divisions cannot be the same");
  }
  const sourceSubjects = await DivisionSubject.findAll({
    where: { divisionId: fromDivisionId }
  });

  if (!sourceSubjects.length) {
    throw new ApiError(404, "No subjects found in source division");
  }
  const targetSubjects = await DivisionSubject.findAll({
    where: { divisionId: toDivisionId }
  });

  const targetSubjectIds = new Set(
    targetSubjects.map(ds => ds.subjectId)
  );
  const subjectsToCopy = sourceSubjects
    .filter(ds => !targetSubjectIds.has(ds.subjectId))
    .map(ds => ({
      divisionId: toDivisionId,
      subjectId: ds.subjectId
    }));

  if (!subjectsToCopy.length) {
    return res.status(200).json(
      new ApiResponse(200, null, "All subjects already exist in target division")
    );
  }

  await DivisionSubject.bulkCreate(subjectsToCopy);

  return res.status(200).json(
    new ApiResponse(
      200,
      { copiedCount: subjectsToCopy.length },
      "Subjects copied successfully"
    )
  );
});


export{
    allotSubjectToDivision,
    getDivisionSubjects,
    removeSubjectFromDivision,
    copySubjectsBetweenDivisions
}