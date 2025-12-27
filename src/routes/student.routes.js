import { Router } from "express";
import { onboardStudent,studentDashboard, subjectTask } from "../controllers/student.controller.js"
import { verifyAccessToken,authorizeRoles } from "../middlewares/auth.middlewares.js";
import { requireOnboarding } from "../middlewares/requireOnboarding.middlewares.js"

const router = Router()

router.post("/onboard-student",verifyAccessToken,authorizeRoles("STUDENT"),onboardStudent)
router.get("/dashboard",verifyAccessToken,authorizeRoles("STUDENT"),requireOnboarding,studentDashboard)
router.get("/get-subject-tasks/",verifyAccessToken,authorizeRoles("STUDENT"),subjectTask)


export default router