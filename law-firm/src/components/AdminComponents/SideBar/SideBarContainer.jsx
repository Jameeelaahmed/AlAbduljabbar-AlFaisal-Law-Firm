// Libraries
import { useEffect, useState } from 'react'
// Components
import SideBarPresentational from './SideBarPresentational'
import { useTranslation } from 'react-i18next';

export default function SideBarContainer() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Check if screen is large (>= 1024px) on initial load
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsSidebarOpen(isLargeScreen);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handletoggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <SideBarPresentational
      isSidebarOpen={isSidebarOpen}
      handletoggleSidebar={handletoggleSidebar}
      t={t}
    />
  )
}