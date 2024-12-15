import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Status {
  ToDo = "To Do",
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
  Backlog = "Backlog",
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

export interface SearchResults {
  tasks?: Task[]
  projects?: Project[]
  users?: User[]
}

export interface Team {
  teamId: number;
  teamName: string;
  projectOwnerId?: number;
  projectManagerId?: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    getProjectById: build.query<Project, { id: number }>({
      query: ({ id }) => `projects/edit/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: 'Projects' as const, id: result.id }]
          : [{ type: 'Projects' as const }],
    }),    
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: `projects`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: build.mutation<Project, { id: string; data: Partial<Project> }>({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PATCH", 
        body: data,
      }),
      invalidatesTags: ["Projects"], 
    }),
    deleteProject: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    getTask: build.query<Task[], { projectId: number }>({
      query: ({projectId}) => `tasks?projectId=${projectId}`,
      providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Tasks' as const, id })) : [{ type: 'Tasks' as const}]
    }),
    getTasksByUser: build.query<Task[], { userId: number }>({
      query: ({userId}) => `tasks/user/${userId}`,
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
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`
    })
  }),
});

export const { useCreateProjectMutation, useGetProjectsQuery, useGetProjectByIdQuery, useUpdateProjectMutation, useDeleteProjectMutation, useGetTaskQuery, useCreateTaskMutation, useUpdateTaskStatusMutation, useSearchQuery, useGetUsersQuery, useGetTeamsQuery, useGetTasksByUserQuery } = api;
