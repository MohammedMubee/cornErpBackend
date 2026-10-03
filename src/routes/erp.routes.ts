import { Router } from "express";
import {
  billingController,
  boqController,
  dailyReportController,
  inventoryController,
  labourController,
  materialController,
  materialRequestController,
  purchaseOrderController,
} from "../controllers/erp.controller";
import { crudRoutes } from "./crudRouteFactory";

const router = Router();

router.use("/boq", crudRoutes("BOQ", boqController));
router.use("/materials", crudRoutes("MATERIALS", materialController));
router.use("/material-requests", crudRoutes("MATERIAL_REQUEST", materialRequestController));
router.use("/purchase-orders", crudRoutes("PURCHASE_ORDER", purchaseOrderController));
router.use("/inventory", crudRoutes("INVENTORY", inventoryController));
router.use("/daily-reports", crudRoutes("DAILY_REPORT", dailyReportController));
router.use("/labours", crudRoutes("LABOUR", labourController));
router.use("/billing", crudRoutes("BILLING", billingController));

export default router;
