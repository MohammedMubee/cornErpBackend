// mvp/backend/csApi/src/models/materialRequest.model.ts
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMaterialRequest extends Document {
  requestNo: string;
  project: Types.ObjectId;
  site: string;
  requestedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  
  // Moved directly to the root level
  material: string; 
  quantity: number;
  unit: string;
  
  status: "Pending" | "Approved" | "Rejected" | "Ordered";
  requiredDate?: Date;
  remarks?: string;
}

const schema = new Schema<IMaterialRequest>(
  {
    requestNo: { type: String, required: true, unique: true, uppercase: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    site: { type: String, required: true, trim: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    
    // Flat fields
    material: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Ordered"], default: "Pending" },
    requiredDate: Date,
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

export const MaterialRequestModel = mongoose.model<IMaterialRequest>("MaterialRequest", schema);