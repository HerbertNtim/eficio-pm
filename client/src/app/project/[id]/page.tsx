import React, { useState } from 'react'

type Props = {
  params: {id: string}
}

function Project({params}: Props) {
  const [activeTab, setActiveTab] = React.useState('Board')
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)
  
  return (
    <div>

    </div>
  )
}

export default Project
