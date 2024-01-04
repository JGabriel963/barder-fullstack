import { Router } from "express";
import { CreateUserController } from "./controllers/user/create-user-controller";
import { prisma } from "./prisma";

const router = Router();

// --- ROTAS USER ---
router.post("/user", CreateUserController.handle);
router.get("/user", async (req, res) => {
  const user = await prisma.user.findMany();

  return res.json(user);
});

export { router };
