import { Router } from "express";
import { createDivision, deleteDivision, getAllDivision, getDivisionById, updateDivision } from "../controllers/division.controllers.js";
import { verifyAccessToken,authorizeRoles } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/",verifyAccessToken,authorizeRoles("ADMIN"),createDivision);
router.get("/get-divisions",getAllDivision)
router.get("/:id",getDivisionById)
router.patch("/:id",verifyAccessToken,authorizeRoles("ADMIN"),updateDivision)
router.delete("/:id",verifyAccessToken,authorizeRoles("ADMIN"),deleteDivision)

export default router;