import { Router } from "express";
import authRoutes from "./auth.routes";
import clientRoutes from "./client.routes";
import moduleRoutes from "./module.routes";
import projectRoutes from "./project.routes";
import roleRoutes from "./role.routes";
import userRoutes from "./user.routes";
import erpRoutes from "./erp.routes";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, message: "Construction ERP API running" }));
router.use("/auth", authRoutes);
router.use("/modules", moduleRoutes);
router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/projects", projectRoutes);
router.use("/erp", erpRoutes);

export default router;
