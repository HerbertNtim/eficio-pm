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


export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    // Fetch project by ID from the database
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }, // Assuming `id` is a number. Adjust if it's a string.
    });

    // Handle case where the project is not found
    if (!project) {
      res.status(404).json({ message: "Project not found" });
    }

    // Return the project details
    res.status(200).json(project);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching project by ID: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    // Validate input
    if (!name || !description || !startDate || !endDate) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

     // Check if the task with the same title already exists
     const existingProject = await prisma.project.findFirst({
      where: {
        name: name,
      },
    });

    if (existingProject) {
       res.status(400).json({
        message: "A project with the same name already exists.",
      });
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

     // Sync the sequence with the current highest ID
     const maxIdResult = await prisma.$queryRaw<{ maxId: number }[]>`
     SELECT MAX(id) as maxId FROM project;
   `;

   const maxId = maxIdResult[0]?.maxId || 0;

   await prisma.$executeRaw`
     SELECT setval(pg_get_serial_sequence('project', 'id'), ${maxId});
   `;

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
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;
  try { 
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
    res.status(200).json({ message: "Project Updated" ,project: updateProject });
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

    // Renumber IDs to fill gaps
    await prisma.$executeRaw`
      WITH cte AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS new_id
        FROM "Project"
      )
      UPDATE "Project"
      SET id = cte.new_id
      FROM cte
      WHERE "Project".id = cte.id;
    `;

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
