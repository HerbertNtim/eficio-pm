import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/projectController";

const projectRoutes = Router();
projectRoutes.get('/', getProjects)
projectRoutes.get("/edit/:id", getProjectById);
projectRoutes.post('/', createProject)
projectRoutes.patch('/:id', updateProject)
projectRoutes.delete("/:id", deleteProject);

export default projectRoutes;
