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
import { CountHaircutController } from "./controllers/haircut/count-haircut-controller";
import { DetailHaricutController } from "./controllers/haircut/detail-haircut-controller";
import { NewScheduleController } from "./controllers/schedule/new-schedule-controller";
import { ListScheduleController } from "./controllers/schedule/list-schedule-controller";
import { FinishScheduleController } from "./controllers/schedule/finish-schedule-controller";
import { SubscribeController } from "./controllers/subscription/subscribe-controller";

const router = Router();

// --- ROUTES USER ---
router.post("/user", CreateUserController.handle);
router.post("/session", AuthUserController.handle);
router.get("/me", isAuthenticated, DetailUserController.handle);
router.put("/user", isAuthenticated, UpdateUserController.handle);

// --- ROUTES HAIRCUT ---
router.post("/haircut", isAuthenticated, CreateHaircutController.hanlde);
router.get("/haircuts", isAuthenticated, ListHaircutController.handle);
router.put("/haircut", isAuthenticated, UpdateHaircutController.handle);
router.get(
  "/haircut/check",
  isAuthenticated,
  CheckSubscriptionController.handle
);
router.get("/haircut/count", isAuthenticated, CountHaircutController.handle);
router.get("/haircut/detail", isAuthenticated, DetailHaricutController.handle);

// --- ROUTES SERVICES ---
router.post("/schedule", isAuthenticated, NewScheduleController.handle);
router.get("/schedule", isAuthenticated, ListScheduleController.handle);
router.delete("/schedule", isAuthenticated, FinishScheduleController.handle);

// --- ROUTES PAYMENTS ---
router.post("/subscribe", isAuthenticated, SubscribeController.hanlde);

export { router };
