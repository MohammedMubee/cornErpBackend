import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProjectTeamMember {
  user: Types.ObjectId;
  role: Types.ObjectId;
  designation?: string;
  // assignedBy?: Types.ObjectId;
  assignedDate: Date;
  isLead: boolean;
  isActive: boolean;
}

export interface IProject extends Document {
  name: string;
  code: string;
  client: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  team: IProjectTeamMember[];
  status: "Planning" | "Active" | "On Hold" | "Completed" | "Cancelled";
  description?: string;
}

const projectTeamSchema = new Schema<IProjectTeamMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    designation: { type: String, trim: true },
    // assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedDate: { type: Date, default: Date.now },
    isLead: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true, index: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    client: { type:String, required: true, index: true },
    location: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { 
      type: Date,
      validate: {
        validator: function(this: IProject, value: Date) {
          if (!value) return true;
          return value >= this.startDate;
        },
        message: "End date cannot be earlier than start date."
      }
    },
    budget: { type: Number, default: 0, min: 0 },
    team: [projectTeamSchema],
    status: { 
      type: String, 
      enum: ["Planning", "Active", "On Hold", "Completed", "Cancelled"], 
      default: "Planning",
      index: true
    },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

// Compound text indices for optimized global site searches
projectSchema.index({ name: "text", code: "text", location: "text" });

export const ProjectModel = mongoose.model<IProject>("Project", projectSchema);