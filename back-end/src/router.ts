import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { AuthUserController } from "./controllers/user/auth-user-controller";
import { DetailUserController } from "./controllers/user/detail-user-controller";
import { isAuthenticated } from "./middleware/is-authenticated";
import { UpdateUserController } from "./controllers/user/update-user-controller";

const router = Router();

// --- ROTAS USER ---
router.post("/user", CreateUserController.handle);
router.post("/session", AuthUserController.handle);
router.get("/me", isAuthenticated, DetailUserController.handle);
router.put("/user", isAuthenticated, UpdateUserController.handle);

export { router };
