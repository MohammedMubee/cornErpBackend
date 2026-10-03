import { Router } from "express";
import { createClient, deleteClient, getClient, listClients, updateClient } from "../controllers/client.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../validators/common";
import { clientCreateSchema, clientUpdateSchema } from "../validators/client.validator";

const router = Router();
router.use(protect);
router.get("/", authorize("PROJECTS", "VIEW"), listClients);
router.get("/:id", authorize("PROJECTS", "VIEW"), getClient);
router.post("/", authorize("PROJECTS", "CREATE"), validate(clientCreateSchema), createClient);
router.put("/:id", authorize("PROJECTS", "UPDATE"), validate(clientUpdateSchema), updateClient);
router.delete("/:id", authorize("PROJECTS", "DELETE"), deleteClient);
export default router;
