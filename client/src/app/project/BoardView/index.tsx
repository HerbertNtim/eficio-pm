import React from 'react'

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

const taskStatus = [ 'To Do', "Work In Progress", "Under Review", "Completed" ];

function BoardView({}: BoardProps) {
  const {data: tasks, isLoading, isError } = 

  return (
    <div>BoardView</div>
  )
}

export default BoardView
