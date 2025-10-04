// Libraries
// Components
import { use, useEffect, useState } from 'react'
import SideBarPresentational from './SideBarPresentational'

export default function SideBarContainer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handletoggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <SideBarPresentational
      isSidebarOpen={isSidebarOpen}
      handletoggleSidebar={handletoggleSidebar}
    />
  )
}
