import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware";

type Controller = {
  list: any;
  get: any;
  create: any;
  update: any;
  remove: any;
};

export function crudRoutes(moduleCode: string, controller: Controller) {
  const router = Router();
  // router.use(protect);
  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);
  return router;
}
