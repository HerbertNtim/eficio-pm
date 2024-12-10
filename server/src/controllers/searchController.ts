import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {title: { contains: query as string }},
          {description: { contains: query as string }}
        ]
      }
    })

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          {name: { contains: query as string }},
          {description: { contains: query as string }}
        ]
      }
    })

    const user = await prisma.user.findMany({
      where: {
        OR: [
          {username: { contains: query as string }},
        ]
      }
    })
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error getting  tasks: ${error.message}` });
  }
};
