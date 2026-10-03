import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPOItem {
  material: Types.ObjectId;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
}

export interface IPurchaseOrder extends Document {
  poNumber: string;
  project: Types.ObjectId;
  materialRequest?: Types.ObjectId;
  vendorName: string;
  vendorPhone?: string;
  items: IPOItem[];
  subTotal: number;
  taxAmount: number;
  grandTotal: number;
  status: "Draft" | "Approved" | "Received" | "Cancelled";
  expectedDeliveryDate?: Date;
}

const itemSchema = new Schema<IPOItem>(
  {
    material: { type: Schema.Types.ObjectId, ref: "Material", required: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, trim: true },
    rate: { type: Number, required: true, min: 0 },
    total: { type: Number, default: 0 },
  },
  { _id: false }
);

const schema = new Schema<IPurchaseOrder>(
  {
    poNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    materialRequest: { type: Schema.Types.ObjectId, ref: "MaterialRequest" },
    vendorName: { type: String, required: true, trim: true },
    vendorPhone: { type: String, trim: true },
    items: [itemSchema],
    subTotal: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    status: { type: String, enum: ["Draft", "Approved", "Received", "Cancelled"], default: "Draft" },
    expectedDeliveryDate: Date,
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  this.items = this.items.map((item) => ({ ...item, total: item.quantity * item.rate }));
  this.subTotal = this.items.reduce((sum, item) => sum + item.total, 0);
  this.grandTotal = this.subTotal + this.taxAmount;
  next();
});

export const PurchaseOrderModel = mongoose.model<IPurchaseOrder>("PurchaseOrder", schema);
