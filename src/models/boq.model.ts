import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBOQ extends Document {
  project: Types.ObjectId;
  category: string;
  itemName: string;
  description?: string;
  unit: string;
  quantity: number;
  rate: number;
  total: number;
  completedQty: number;
  status: "Pending" | "In Progress" | "Completed";
}

const boqSchema = new Schema<IBOQ>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    category: { type: String, required: true, trim: true },
    itemName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    unit: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    rate: { type: Number, required: true, min: 0 },
    total: { type: Number, default: 0 },
    completedQty: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

boqSchema.pre("save", function (next) {
  this.total = this.quantity * this.rate;
  next();
});

export const BOQModel = mongoose.model<IBOQ>("BOQ", boqSchema);
