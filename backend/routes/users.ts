import express from "express";
import { usersController } from "../controllers/usersController";

const router = express.Router();

router.get("/", usersController.getAll);
router.post("/", usersController.add);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);
router.post("/login", usersController.login);

export {router as usersRoutes};
