import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  clientCode: string;
  companyName: string;
  contactPerson: string;
  email?: string;
  phone: string;
  alternatePhone?: string;
  website?: string;
  gstNumber?: string;
  panNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  clientType: "Builder" | "Individual" | "Government" | "Corporate" | "Contractor";
  status: "Active" | "Inactive";
  remarks?: string;
}

const clientSchema = new Schema<IClient>(
  {
    clientCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    alternatePhone: { type: String, trim: true },
    website: { type: String, trim: true },
    gstNumber: { type: String, uppercase: true, trim: true },
    panNumber: { type: String, uppercase: true, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, default: "India", trim: true },
    pincode: { type: String, required: true, trim: true },
    clientType: { type: String, enum: ["Builder", "Individual", "Government", "Corporate", "Contractor"], default: "Builder" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ClientModel = mongoose.model<IClient>("Client", clientSchema);
