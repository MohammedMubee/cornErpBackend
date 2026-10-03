import mongoose, { Document, Schema, Types } from "mongoose";

export interface IInventory extends Document {
  project: Types.ObjectId;
  site: string;
  material: Types.ObjectId;
  unit: string;
  receivedQty: number;
  consumedQty: number;
  availableQty: number;
  minimumStock: number;
  status: "Available" | "Low Stock" | "Out of Stock";
}

const schema = new Schema<IInventory>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    site: { type: String, required: true, trim: true },
    material: { type: Schema.Types.ObjectId, ref: "Material", required: true },
    unit: { type: String, required: true, trim: true },
    receivedQty: { type: Number, default: 0, min: 0 },
    consumedQty: { type: Number, default: 0, min: 0 },
    availableQty: { type: Number, default: 0 },
    minimumStock: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["Available", "Low Stock", "Out of Stock"], default: "Available" },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  this.availableQty = this.receivedQty - this.consumedQty;
  this.status = this.availableQty <= 0 ? "Out of Stock" : this.availableQty <= this.minimumStock ? "Low Stock" : "Available";
  next();
});

export const InventoryModel = mongoose.model<IInventory>("Inventory", schema);
