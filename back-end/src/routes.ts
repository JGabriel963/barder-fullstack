import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { prisma } from "./prisma";

const router = Router();

// --- ROTAS USER ---
router.post("/user", CreateUserController.handle);
router.get("/user", (req, res) => {
  const user = prisma.user.findMany();

  return res.json(user);
});

export { router };
