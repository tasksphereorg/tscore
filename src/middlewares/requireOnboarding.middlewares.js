import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.models.js"



const requireOnboarding = asyncHandler(async (req, res, next) => {
  const student = await Student.findOne({
    where: { userId: req.user.id }
  });

  if (!student || !student.onboarded) {
    throw new ApiError(403, "User not onboarded");
  }

  req.student = student;
  next();
});

export { requireOnboarding }