import { connectDB } from "../config/db";
import { INITIAL_MODULES, PERMISSIONS } from "../constants";
import { ClientModel } from "../models/client.model";
import { ModuleModel } from "../models/module.model";
import { ProjectModel } from "../models/project.model";
import { RoleModel } from "../models/role.model";
import { UserModel } from "../models/user.model";

async function seed() {
  await connectDB();

  await Promise.all([
    ProjectModel.deleteMany({}),
    ClientModel.deleteMany({}),
    UserModel.deleteMany({}),
    RoleModel.deleteMany({}),
    ModuleModel.deleteMany({}),
  ]);

  const modules = await ModuleModel.insertMany(INITIAL_MODULES);
  const moduleMap = new Map(modules.map((module) => [module.code, module]));

  const allPermissions = modules.map((module) => ({
    module: module._id,
    moduleCode: module.code,
    permissions: [...PERMISSIONS],
  }));

  const viewCreateUpdate = (codes: string[]) =>
    codes.map((code) => {
      const module = moduleMap.get(code);
      if (!module) throw new Error(`Module missing: ${code}`);
      return { module: module._id, moduleCode: code, permissions: ["VIEW", "CREATE", "UPDATE"] };
    });

  const adminRole = await RoleModel.create({
    name: "Admin",
    code: "ADMIN",
    description: "Full system access",
    permissions: allPermissions,
    isSystem: true,
  });

  const pmRole = await RoleModel.create({
    name: "Project Manager",
    code: "PROJECT_MANAGER",
    description: "Manage projects, teams, BOQ, daily reports and approvals",
    permissions: viewCreateUpdate(["PROJECTS", "BOQ", "MATERIAL_REQUEST", "DAILY_REPORT", "LABOUR"]),
    isSystem: true,
  });

  const siteEngineerRole = await RoleModel.create({
    name: "Site Engineer",
    code: "SITE_ENGINEER",
    description: "Create site reports and material requests",
    permissions: viewCreateUpdate(["PROJECTS", "MATERIAL_REQUEST", "DAILY_REPORT", "LABOUR"]),
    isSystem: true,
  });

  const storeRole = await RoleModel.create({
    name: "Store Manager",
    code: "STORE_MANAGER",
    description: "Manage materials, purchase receipt and inventory",
    permissions: viewCreateUpdate(["MATERIALS", "MATERIAL_REQUEST", "PURCHASE_ORDER", "INVENTORY"]),
    isSystem: true,
  });

  await RoleModel.create({
    name: "Accountant",
    code: "ACCOUNTANT",
    description: "Billing and purchase order financial access",
    permissions: viewCreateUpdate(["PURCHASE_ORDER", "BILLING"]),
    isSystem: true,
  });

  const admin = await UserModel.create({
    name: "ERP Admin",
    email: "admin@constructionerp.com",
    phone: "9876543210",
    password: "Admin@123",
    role: adminRole._id,
    targetUser: "Builder",
  });

  const pm = await UserModel.create({
    name: "Project Manager",
    email: "pm@constructionerp.com",
    phone: "9876501234",
    password: "Admin@123",
    role: pmRole._id,
    targetUser: "Project Manager",
  });

  await UserModel.create({
    name: "Site Engineer",
    email: "site@constructionerp.com",
    phone: "9876512345",
    password: "Admin@123",
    role: siteEngineerRole._id,
    targetUser: "Site Engineer",
  });

  await UserModel.create({
    name: "Store Manager",
    email: "store@constructionerp.com",
    phone: "9876523456",
    password: "Admin@123",
    role: storeRole._id,
    targetUser: "Store Manager",
  });

  const client = await ClientModel.create({
    clientCode: "CLI001",
    companyName: "ABC Builders Pvt Ltd",
    contactPerson: "Ramesh Kumar",
    email: "ramesh@abcbuilders.com",
    phone: "9876543211",
    gstNumber: "33ABCDE1234F1Z5",
    panNumber: "ABCDE1234F",
    addressLine1: "No 10 GST Road",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
    clientType: "Builder",
  });

  await ProjectModel.create({
    name: "ABC Apartment Construction",
    code: "PRJ001",
    client: client._id,
    location: "Chennai",
    startDate: new Date(),
    budget: 5000000,
    status: "Active",
    description: "MVP sample project",
    team: [{ user: pm._id, role: pmRole._id, assignedBy: admin._id, isLead: true }],
  });

  console.log("Seed completed");
  console.log("Admin login: admin@constructionerp.com / Admin@123");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
