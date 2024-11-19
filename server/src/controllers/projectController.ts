import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProjects = async(req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating a project: ${error.message}` });
  }
}

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, startDate, endDate } = req.body;

    // Log request body for debugging
    console.log("Request body:", req.body);

    // Validate input
    if (!name || !description || !startDate || !endDate) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Parse dates and create project
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    // Send success response with a message
    res.status(201).json({ 
      message: "Project created successfully", 
      project: newProject 
    });
  } catch (error: any) {
    console.error("Error creating project:", error); // Log detailed error for debugging
    res.status(500).json({ message: `Error creating a project: ${error.message}` });
  }
};

export const updateProject = async(req: Response, res: Response): Promise<void> => {
  
}
