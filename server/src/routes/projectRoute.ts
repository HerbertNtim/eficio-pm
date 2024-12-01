import { Router } from "express";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController";

const projectRoutes = Router();
projectRoutes.get('/', getProjects)
projectRoutes.post('/', createProject)
projectRoutes.patch('/:id', updateProject)
projectRoutes.delete("/:id", deleteProject);

export default projectRoutes;
