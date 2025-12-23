import { Router } from "express";
import { verifyAccessToken,authorizeRoles } from "../middlewares/auth.middlewares.js";
import { createYear, deleteYear, getAllYears, getYearById, updateYear } from "../controllers/year.controllers.js";


const router = Router()

router.post("/create",verifyAccessToken,authorizeRoles("ADMIN"),createYear)
router.get("/get-years",getAllYears)
router.get("/:id",getYearById)
router.patch("/:id",verifyAccessToken,authorizeRoles("ADMIN"),updateYear)
router.delete("/:id",verifyAccessToken,authorizeRoles("ADMIN"),deleteYear)

export default router
