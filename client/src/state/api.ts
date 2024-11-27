import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Status {
  Todo = "To Do",
  Completed = "Completed",
  UnderReview = "Under Review",
  Backlog = "Backlog",
  WorkInProgress = "Work In Progress",
}

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Urgent = "Urgent",
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePictureURL?: string;
  cognitoId?: string;
  teamId?: number;
}
export interface Attachment {
  id: number;
  filename: string;
  fileURL: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  projectId?: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  attachments?: Attachment[];
  comments?: Comment[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (build) => ({
    // Define your endpoints here
  }),
});

export const {} = api
