import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { AuthUserController } from "./controllers/user/auth-user-controller";

const router = Router();

// --- ROTAS USER ---
router.post("/user", CreateUserController.handle);
router.post("/session", AuthUserController.handle);

export { router };
