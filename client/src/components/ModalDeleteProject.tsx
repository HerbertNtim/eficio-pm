import Modal from "@/components/Modal";
import React from "react";
import { Project, useDeleteProjectMutation } from "@/state/api";
import { redirect } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: Project; // Assume Project is already defined elsewhere
};

const ModalDeleteProject = ({ isOpen, onClose, project }: Props) => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const handleDelete = async () => {
    await deleteProject({ id: project.id });
    onClose();
    redirect("/")
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Delete Project">
      <div className="mt-4 space-y-4">
        <p className="text-gray-800 dark:text-gray-200">
          Are you sure you want to delete the project{" "}
          <span className="font-semibold">{project.name}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-dark-secondary dark:text-white dark:hover:bg-dark-tertiary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`rounded-md border border-transparent bg-red-600 px-4 py-2 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteProject;
