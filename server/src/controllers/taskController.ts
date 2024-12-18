import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error getting  tasks: ${error.message}` });
  }
};

export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const userTasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            authorUserId: Number(userId),
          },
          {
            assignedUserId: Number(userId),
          },
        ]
      },
    });
    res.status(200).json(userTasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error getting  tasks: ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
     // Check if the task with the same title already exists
     const existingTask = await prisma.task.findFirst({
      where: {
        title: title,
        projectId: projectId, 
      },
    });

    if (existingTask) {
      res.status(400).json({
        message: "A task with the same title already exists in this project.",
      });
      return;
    }

    // Create the task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });

    // Send success response with a message
    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a task: ${error.message}` });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { 
    title, 
    description, 
    status, 
    priority, 
    tags, 
    startDate, 
    dueDate, 
    points, 
    projectId, 
    authorUserId, 
    assignedUserId,
  } = req.body;
  const { taskId } = req.params
  
  try {
    if (!parseInt(taskId)) {
      res.status(400).json({ message: "Invalid task ID"});
      return;
    }

    // Check if the task exists within the specified project
    const existingTask = await prisma.task.findFirst({
      where: {
        id: parseInt(taskId),
        projectId: parseInt(projectId), // Ensure projectId is an integer
      },
    });

    if (!existingTask) {
      res.status(404).json({
        message: "Task not found in the specified project.",
      });
      return;
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate: new Date(startDate),
        dueDate: new Date(dueDate),
        points,
        projectId: parseInt(projectId), 
        authorUserId,
        assignedUserId,
      },
    });

    // Send success response with the updated task
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating task: ${error.message}` });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;  // Assuming the task ID is passed in the URL

  try {
    // Check if the task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: Number(taskId) },
    });

    if (!existingTask) {
      res.status(404).json({
        message: "Task not found.",
      });
      return;
    }

    // Delete the task
    await prisma.task.delete({
      where: { id: Number(taskId) },
    });

    // Send success response with a message
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting task: ${error.message}` });
  }
};


export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        status: status,
      },
    });
    res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating task status: ${error.message}` });
  }
};
