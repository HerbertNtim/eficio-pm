import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany()
    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const projectOwner = await prisma.user.findUnique({
          where: { userId: team.projectOwnerId! },
          select: { username: true },
        });
        
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerId! },
          select: { username: true },
        })
        
        return {
          ...team,
          projectOwnerUsername: projectOwner?.username,
          projectManagerUsername: projectManager?.username
        }
      }) 
    )

    res.status(200).json();
  } catch (error: any) {
    res.status(500).json({ message: `Error getting users: ${error.message}` });
  }
};
