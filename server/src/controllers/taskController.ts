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
    console.log(error);
    res
      .status(500)
      .json({ message: `Error creating a task: ${error.message}` });
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
