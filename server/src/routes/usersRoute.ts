import { Router } from "express";
import { getUsers } from "../controllers/usersController";

const usersRouter = Router();
usersRouter.get('/', getUsers)

export default usersRouter;
