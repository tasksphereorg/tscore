import { Router } from "express";
import { createTask, getAllTaskBySubjectDivision, getTaskById, updateTask, deleteTask } from "../controllers/task.controllers.js";
import { verifyAccessToken,authorizeRoles } from "../middlewares/auth.middlewares.js";


const router = Router();

router.post("/",verifyAccessToken,authorizeRoles("ADMIN"),createTask)
router.get("/:id",getTaskById)
router.get("/",getAllTaskBySubjectDivision)
router.patch("/:id",verifyAccessToken,authorizeRoles("ADMIN"),updateTask)
router.delete("/:id", verifyAccessToken, authorizeRoles("ADMIN"), deleteTask);


export default router
