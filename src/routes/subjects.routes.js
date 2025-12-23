import { Router } from "express";
import { createSubject, deleteSubject, getAllSubjects, getSubjectById, updateSubject } from "../controllers/subject.controllers.js";
import { verifyAccessToken,authorizeRoles } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/",verifyAccessToken,authorizeRoles("ADMIN"),createSubject);
router.get("/get-subjects",getAllSubjects)
router.get("/:id",getSubjectById)
router.patch("/:id",verifyAccessToken,authorizeRoles("ADMIN"),updateSubject)
router.delete("/:id",verifyAccessToken,authorizeRoles("ADMIN"),deleteSubject)

export default router;