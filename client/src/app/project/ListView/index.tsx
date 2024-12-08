import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { useGetTaskQuery } from '@/state/api';
import React from 'react'

type ListProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};
const ListView = ({id, setIsModalNewTaskOpen}: ListProps) => {
  const {data: tasks, isError, isLoading } = useGetTaskQuery({ projectId: Number(id)});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Fetching Tasks</div>;
  
  return (
    <div className='px-4 xl:px-6 pb-8'>
      <div className='pt-5'>
        <Header name='List' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
        {tasks?.map((task) => <TaskCard key={task.id} task={task}/>)}
      </div>
    </div>
  )
}

export default ListView
