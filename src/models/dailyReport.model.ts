import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProgressItem {
  boq: Types.ObjectId;
  completedQtyToday: number;
  remarks?: string;
}

export interface IDailyReport extends Document {
  project: Types.ObjectId;
  site: string;
  reportDate: Date;
  createdBy: Types.ObjectId;
  progress: IProgressItem[];
  manpowerCount: number;
  weather?: string;
  photos: string[];
  issues: string[];
  remarks?: string;
}

const progressSchema = new Schema<IProgressItem>(
  {
    boq: { type: Schema.Types.ObjectId, ref: "BOQ", required: true },
    completedQtyToday: { type: Number, required: true, min: 0 },
    remarks: { type: String, trim: true },
  },
  { _id: false }
);

const schema = new Schema<IDailyReport>(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    site: { type: String, required: true, trim: true },
    reportDate: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    progress: [progressSchema],
    manpowerCount: { type: Number, default: 0, min: 0 },
    weather: { type: String, trim: true },
    photos: [{ type: String, trim: true }],
    issues: [{ type: String, trim: true }],
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

export const DailyReportModel = mongoose.model<IDailyReport>("DailyReport", schema);
