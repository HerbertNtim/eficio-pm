import Modal from "@/components/Modal";
import { Project, useUpdateProjectMutation } from "@/state/api";
import React, { useState, useEffect } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
};

const ModalEditProject = ({ isOpen, onClose, project }: Props) => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  // Initialize form state with the existing project details
  const [projectName, setProjectName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);

  // Update the form state when the project prop changes
  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setDescription(project.description || "");
      setStartDate(project.startDate);
      setEndDate(project.endDate);
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await updateProject({
      id: project.id.toString(),
      data: {
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    });

    onClose(); // Close the modal on successful update
  };

  const isFormValid = () => {
    return projectName && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalEditProject;
