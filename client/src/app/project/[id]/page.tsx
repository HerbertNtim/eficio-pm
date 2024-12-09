import Project from "../Project";


interface Props {
  params: { id: string };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = params; 
  return <Project id={id} />;
}
