import { Router } from "express";
import { createUser, deleteUser, getUser, listUsers, updateUser } from "../controllers/user.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../validators/common";
import { registerSchema } from "../validators/auth.validator";

const router = Router();
// router.use(protect);
router.get("/", listUsers);
router.get("/:id", authorize("USERS", "VIEW"), getUser);
router.post("/", createUser);
router.put("/:id", authorize("USERS", "UPDATE"), updateUser);
router.delete("/:id", authorize("USERS", "DELETE"), deleteUser);
export default router;
