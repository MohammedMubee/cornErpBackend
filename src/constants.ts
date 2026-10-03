export const PERMISSIONS = ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE"] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const INITIAL_MODULES = [
  { name: "Auth", code: "AUTH", path: "/auth", icon: "ShieldCheck", order: 1 },
  { name: "Users", code: "USERS", path: "/users", icon: "Users", order: 2 },
  { name: "Roles", code: "ROLES", path: "/roles", icon: "Shield", order: 3 },
  { name: "Projects", code: "PROJECTS", path: "/projects", icon: "Building2", order: 4 },
  { name: "BOQ", code: "BOQ", path: "/boq", icon: "ClipboardList", order: 5 },
  { name: "Materials", code: "MATERIALS", path: "/materials", icon: "Boxes", order: 6 },
  { name: "Material Request", code: "MATERIAL_REQUEST", path: "/material-request", icon: "PackagePlus", order: 7 },
  { name: "Purchase Order", code: "PURCHASE_ORDER", path: "/purchase-order", icon: "ShoppingCart", order: 8 },
  { name: "Inventory", code: "INVENTORY", path: "/inventory", icon: "Warehouse", order: 9 },
  { name: "Daily Report", code: "DAILY_REPORT", path: "/daily-reports", icon: "FileText", order: 10 },
  { name: "Labour", code: "LABOUR", path: "/labour", icon: "HardHat", order: 11 },
  { name: "Billing", code: "BILLING", path: "/billing", icon: "ReceiptText", order: 12 },
].map((module) => ({ ...module, isActive: true }));
