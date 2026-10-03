import { BillingModel } from "../models/billing.model";
import { BOQModel } from "../models/boq.model";
import { DailyReportModel } from "../models/dailyReport.model";
import { InventoryModel } from "../models/inventory.model";
import { LabourModel } from "../models/labour.model";
import { MaterialModel } from "../models/material.model";
import { MaterialRequestModel } from "../models/materialRequest.model";
import { PurchaseOrderModel } from "../models/purchaseOrder.model";
import { createOne, deleteOne, getAll, getById, updateOne } from "./crudFactory";

export const boqController = {
  list: getAll(BOQModel, "project"),
  get: getById(BOQModel, "project"),
  create: createOne(BOQModel),
  update: updateOne(BOQModel),
  remove: deleteOne(BOQModel),
};

export const materialController = {
  list: getAll(MaterialModel),
  get: getById(MaterialModel),
  create: createOne(MaterialModel),
  update: updateOne(MaterialModel),
  remove: deleteOne(MaterialModel),
};

export const materialRequestController = {
  list: getAll(MaterialRequestModel, ["project", "requestedBy", "approvedBy",]),
  get: getById(MaterialRequestModel, ["project", "requestedBy", "approvedBy",]),
  create: createOne(MaterialRequestModel),
  update: updateOne(MaterialRequestModel),
  remove: deleteOne(MaterialRequestModel),
};

export const purchaseOrderController = {
  list: getAll(PurchaseOrderModel, ["project", "materialRequest", "items.material"]),
  get: getById(PurchaseOrderModel, ["project", "materialRequest", "items.material"]),
  create: createOne(PurchaseOrderModel),
  update: updateOne(PurchaseOrderModel),
  remove: deleteOne(PurchaseOrderModel),
};

export const inventoryController = {
  list: getAll(InventoryModel, ["project", "material"]),
  get: getById(InventoryModel, ["project", "material"]),
  create: createOne(InventoryModel),
  update: updateOne(InventoryModel),
  remove: deleteOne(InventoryModel),
};

export const dailyReportController = {
  list: getAll(DailyReportModel, ["project", "createdBy", "progress.boq"]),
  get: getById(DailyReportModel, ["project", "createdBy", "progress.boq"]),
  create: createOne(DailyReportModel),
  update: updateOne(DailyReportModel),
  remove: deleteOne(DailyReportModel),
};

export const labourController = {
  list: getAll(LabourModel, "project"),
  get: getById(LabourModel, "project"),
  create: createOne(LabourModel),
  update: updateOne(LabourModel),
  remove: deleteOne(LabourModel),
};

export const billingController = {
  list: getAll(BillingModel, ["project", "client"]),
  get: getById(BillingModel, ["project", "client"]),
  create: createOne(BillingModel),
  update: updateOne(BillingModel),
  remove: deleteOne(BillingModel),
};
