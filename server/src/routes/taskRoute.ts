import { Router } from "express";
import { createTask, deleteTask, getTasks, getUserTasks, updateTask, updateTaskStatus } from "../controllers/taskController";

const taskRoutes = Router();
taskRoutes.get('/', getTasks)
taskRoutes.post('/', createTask)
taskRoutes.patch('/:taskId', updateTask)
taskRoutes.delete('/:taskId', deleteTask)
taskRoutes.patch('/:taskId/status', updateTaskStatus)
taskRoutes.get("/user/:userId", getUserTasks);

export default taskRoutes;
