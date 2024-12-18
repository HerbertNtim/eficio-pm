import Header from "@/components/Header";
import {
  Clock,
  Filter,
  Grid3x3,
  Grid3X3,
  List,
  Pencil,
  PlusSquare,
  Share2,
  Table,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "./ModalNewProject";
import ModalEditProject from "@/components/ModalEditProject";
import { useParams } from "next/navigation";
import { useGetProjectByIdQuery } from "@/state/api";
import ModalDeleteProject from "@/components/ModalDeleteProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

function ProjectHeader({ activeTab, setActiveTab }: Props) {
  const { id: projectId } = useParams<{ id: string }>();
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  const [isModalEditProjectOpen, setIsModalEditProjectOpen] = useState(false);
  const [isModalDeleteProjectOpen, setIsModalDeleteProjectOpen] =
    useState(false);

  const { data: project } = useGetProjectByIdQuery({ id: Number(projectId) });

  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />

      {project && (
        <ModalEditProject
          isOpen={isModalEditProjectOpen}
          onClose={() => setIsModalEditProjectOpen(false)}
          project={project}
        />
      )}

      {project && (
        <ModalDeleteProject
          isOpen={isModalDeleteProjectOpen}
          onClose={() => setIsModalDeleteProjectOpen(false)}
          project={project}
        />
      )}

      <div className="pb-6 pt-8">
        <Header
          name="Product Design Management"
          buttonComponent={
            <div className="flex gap-2">
              <button
                className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalNewProjectOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5" /> New Boards
              </button>
              <button
                className="flex items-center rounded-md bg-yellow-500 px-3 py-2 text-black hover:bg-yellow-600"
                onClick={() => setIsModalEditProjectOpen(true)}
              >
                <Pencil className="mr-2 h-5 w-5" /> Edit/Update
              </button>
              <button
                className="flex items-center rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                onClick={() => setIsModalDeleteProjectOpen(true)}
              >
                <Trash className="mr-2 h-5 w-5" /> Delete
              </button>
            </div>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-400 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-400 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// TAB BUTTON
type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-200 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive && "text-blue-600 after:bg-blue-600 dark:text-white"
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
