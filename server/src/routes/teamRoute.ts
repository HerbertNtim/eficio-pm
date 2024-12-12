import { Router } from "express";
import { getTeams } from "../controllers/teamController";

const teamRouter = Router();
teamRouter.get("/", getTeams)

export default teamRouter;
