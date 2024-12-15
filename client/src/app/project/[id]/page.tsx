import Project from "../Project";


interface Props {
  params: { id: string };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params; 

  if(!id) {
    return <div className="p-8 dark:bg-dark-secondary dark:text-white w-full h-screen text-center ">Project not found</div>
  }
  
  return <Project id={id} />;
}
