import mongoose, { Document, Schema } from "mongoose";

export interface IModule extends Document {
  name: string;
  code: string;
  path: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

const moduleSchema = new Schema<IModule>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    path: { type: String, required: true, trim: true },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ModuleModel = mongoose.model<IModule>("Module", moduleSchema);
