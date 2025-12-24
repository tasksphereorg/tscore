import { Router } from "express";
import { createSubject, deleteSubject, getAllSubjects, getSubjectById, updateSubject } from "../controllers/subject.controllers.js";
import { verifyAccessToken,authorizeRoles } from "../middlewares/auth.middlewares.js";
import { getDivisionSubjects,allotSubjectToDivision, removeSubjectFromDivision, copySubjectsBetweenDivisions } from "../controllers/DivisionSubject.controllers.js";

const router = Router();

router.post("/",verifyAccessToken,authorizeRoles("ADMIN"),createSubject);
router.get("/get-subjects",getAllSubjects)
router.get("/:id",getSubjectById)
router.patch("/:id",verifyAccessToken,authorizeRoles("ADMIN"),updateSubject)
router.delete("/:id",verifyAccessToken,authorizeRoles("ADMIN"),deleteSubject)


// Division-subject allotment APIs
router.post("/allot-division-subject",verifyAccessToken,authorizeRoles("ADMIN"),allotSubjectToDivision)
router.post("/copy-division-subjects",verifyAccessToken,authorizeRoles("ADMIN"),copySubjectsBetweenDivisions)
router.get("/get-division-subjects/:id",getDivisionSubjects)
router.patch("/remove/division-subject",verifyAccessToken,authorizeRoles("ADMIN"),removeSubjectFromDivision)

export default router;