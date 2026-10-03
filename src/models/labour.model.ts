import mongoose, { Document, Schema, Types } from "mongoose";

export interface ILabour extends Document {
  name: string;
  phone?: string;
  workType: string;
  dailyWage: number;
  project?: Types.ObjectId;
  status: "Active" | "Inactive";
}

const schema = new Schema<ILabour>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    workType: { type: String, required: true, trim: true },
    dailyWage: { type: Number, default: 0, min: 0 },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const LabourModel = mongoose.model<ILabour>("Labour", schema);
