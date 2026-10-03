import { Router } from "express";
import { login, me, register, quickLogin } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../validators/common";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/quick-login", quickLogin);
router.get("/me", protect, me);

export default router;
