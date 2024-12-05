"use client"

import React, { useState } from 'react'
import ProjectHeader from '../ProjectHeader'

type Props = {
  params: {id: string}
}

function Project({params}: Props) {
  // const {id} = params

  const [activeTab, setActiveTab] = React.useState('Board')
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false)
  
  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default Project
