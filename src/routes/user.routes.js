import { Router } from "express";
import { registerUser,loginUser,refreshAccessToken,userProfile,userLogout, loginAdmin } from "../controllers/user.controllers.js";
import { verifyAccessToken } from "../middlewares/auth.middlewares.js";

const router = Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/admin-login",loginAdmin)
router.post("/refresh-token", refreshAccessToken);
router.post("/logout",verifyAccessToken,userLogout)
router.get("/profile",verifyAccessToken,userProfile)



export default router
