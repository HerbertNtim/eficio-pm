import Project from "../Project";


interface Props {
  params: { id: string };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params; 

  if(!id) {
    return <div>Project not found</div>
  }
  
  return <Project id={id} />;
}
