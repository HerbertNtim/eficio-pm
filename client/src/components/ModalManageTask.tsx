import Modal from "@/components/Modal";
import { Priority, Status, useUpdateTaskMutation, useDeleteTaskMutation, Task } from "@/state/api";
import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task
};

const ModalManageTask = ({ isOpen, onClose, task }: Props) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");


  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || Status.ToDo);
      setPriority(task.priority || Priority.Backlog);
      setTags(task.tags || "");
      setStartDate(task.startDate || "");
      setDueDate(task.dueDate || "");
      setAuthorUserId(task.authorUserId?.toString() || "");
      setAssignedUserId(task.assignedUserId?.toString() || "");
      setProjectId(task.projectId?.toString() || "");
    }
  }, [task]);


  const handleUpdate = async () => {
    if (!title || !authorUserId) return;

    const formattedStartDate = formatISO(new Date(startDate), { representation: "complete" });
    const formattedDueDate = formatISO(new Date(dueDate), { representation: "complete" });

    try {
      await updateTask({
        taskId: task.id,
        data: {
          title,
          description,
          status,
          priority,
          tags,
          startDate: formattedStartDate,
          dueDate: formattedDueDate,
          authorUserId: parseInt(authorUserId),
          assignedUserId: parseInt(assignedUserId),
          projectId: projectId ? parseInt(projectId) : undefined,
        }
      }).unwrap();

      onClose();
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (!task.id) return;
    
    try {
      await deleteTask({ taskId: task.id }).unwrap(); 
      onClose(); 
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const isFormValid = () => {
    return title && authorUserId;
  };

  const selectStyles = "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Manage Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])}
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])}
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="ProjectId"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${!isFormValid() || isUpdating ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={!isFormValid() || isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Task"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalManageTask;
