"use client";

import React, { useState } from "react";
import ProjectHeader from "./ProjectHeader";
import BoardView from "./BoardView";

type Props = { id: string };

function Project({ id }: Props) {
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* TABS */}
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
}

export default Project;
