import { Router } from "express";
import { createProject, getProjects, updateProject } from "../controllers/projectController";

const projectRoutes = Router();
projectRoutes.get('/', getProjects)
projectRoutes.post('/', createProject)
projectRoutes.put('/:id', updateProject)

export default projectRoutes;
