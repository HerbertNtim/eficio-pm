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
  userId: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}
export interface Attachment {
  id: number;
  fileName: string;
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
  points? : number;
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
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: `projects`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    getTask: build.query<Task[], { projectId: number }>({
      query: ({projectId}) => `tasks?projectId=${projectId}`,
      providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Tasks' as const, id })) : [{ type: 'Tasks' as const}]
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: `tasks`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery, useGetTaskQuery, useCreateTaskMutation, useUpdateTaskStatusMutation } = api;
