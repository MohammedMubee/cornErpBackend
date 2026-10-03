import mongoose, { Document, Schema, Types } from "mongoose";

export interface IBilling extends Document {
  invoiceNo: string;
  project: Types.ObjectId;
  client?: Types.ObjectId;
  billType: "Client Billing" | "Vendor Billing";
  partyName: string;
  invoiceDate: Date;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  status: "Unpaid" | "Partial" | "Paid";
  remarks?: string;
}

const schema = new Schema<IBilling>(
  {
    invoiceNo: { type: String, required: true, unique: true, uppercase: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    client: { type: Schema.Types.ObjectId, ref: "Client" },
    billType: { type: String, enum: ["Client Billing", "Vendor Billing"], required: true },
    partyName: { type: String, required: true, trim: true },
    invoiceDate: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    balanceAmount: { type: Number, default: 0 },
    status: { type: String, enum: ["Unpaid", "Partial", "Paid"], default: "Unpaid" },
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  this.balanceAmount = this.amount - this.paidAmount;
  this.status = this.paidAmount <= 0 ? "Unpaid" : this.paidAmount < this.amount ? "Partial" : "Paid";
  next();
});

export const BillingModel = mongoose.model<IBilling>("Billing", schema);
