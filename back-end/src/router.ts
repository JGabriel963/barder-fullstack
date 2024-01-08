import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { DetailUserController } from "./controllers/user/detail-user-controller";
import { isAuthenticated } from "./middleware/is-authenticated";
import { UpdateUserController } from "./controllers/user/update-user-controller";
import { CreateHaircutController } from "./controllers/haircut/create-haircut-controller";
import { ListHaircutController } from "./controllers/haircut/list-haircut-controller";
import { UpdateHaircutController } from "./controllers/haircut/update-haircut-controller";
import { CheckSubscriptionController } from "./controllers/haircut/check-subscription-controller";

const router = Router();

// --- ROTAS USER ---
router.post("/user", CreateUserController.handle);
router.post("/session", AuthUserController.handle);
router.get("/me", isAuthenticated, DetailUserController.handle);
router.put("/user", isAuthenticated, UpdateUserController.handle);

// --- ROTAS HAIRCUT ---
router.post("/haircut", isAuthenticated, CreateHaircutController.hanlde);
router.get("/haircuts", isAuthenticated, ListHaircutController.handle);
router.put("/haircut", isAuthenticated, UpdateHaircutController.handle);
router.get(
  "/haircut/check",
  isAuthenticated,
  CheckSubscriptionController.handle
);

export { router };
