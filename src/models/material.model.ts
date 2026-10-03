import mongoose, { Document, Schema } from "mongoose";

export interface IMaterial extends Document {
  name: string;
  code: string;
  category: string;
  unit: string;
  minimumStock: number;
  status: "Active" | "Inactive";
}

const materialSchema = new Schema<IMaterial>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    minimumStock: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const MaterialModel = mongoose.model<IMaterial>("Material", materialSchema);
