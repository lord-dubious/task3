import { useState, useEffect } from 'react';
import { useDeviceType } from './useDeviceType';

interface MobileLayoutState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isMobile: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

/**
 * Custom hook to manage mobile layout state and responsive behavior
 * Handles sidebar collapse, mobile menu state, and body scroll locking
 */
export function useMobileLayout(): MobileLayoutState {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Handle responsive sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isMobile) {
        setSidebarCollapsed(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, isMobile]);

  return {
    sidebarCollapsed,
    mobileMenuOpen,
    isMobile,
    setSidebarCollapsed,
    setMobileMenuOpen,
  };
}
