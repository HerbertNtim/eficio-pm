import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      project: newProject,
    });
  } catch (error: any) {
    console.error("Error creating project:", error); // Log detailed error for debugging
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};

export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params; // Project ID from the route parameters
    const { name, description, startDate, endDate } = req.body; // Fields to update

    // Validate if the project ID is provided
    if (!id) {
      res.status(400).json({ error: "Project ID is required" });
      return;
    }

    // Validate input fields
    if (!name && !description && !startDate && !endDate) {
      res
        .status(400)
        .json({ error: "At least one field must be provided to update" });
      return;
    }

    // Update the project in the database
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
      },
    });

    // Send success response
    res.status(200).json({ updateProject });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Handle specific error when project ID is not found
      res.status(404).json({ error: "Project not found" });
    } else {
      res
        .status(500)
        .json({ message: `Error updating the project: ${error.message}` });
    }
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProject = await prisma.project.delete({
      where: { id: Number(id) }, // Ensure `id` is the correct field and matches your schema
    });

    res.status(200).json({
      message: "Project deleted successfully",
      deletedProject,
    });
  } catch (error: any) {
    res.status(500).json({
      message: `Error deleting the project: ${error.message}`,
    });
  }
};
