import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Check on mount
    checkDeviceType();

    // Listen for resize events
    window.addEventListener('resize', checkDeviceType);
    
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return deviceType;
}

export function useIsMobile(): boolean {
  const deviceType = useDeviceType();
  return deviceType === 'mobile';
}

export function useIsTablet(): boolean {
  const deviceType = useDeviceType();
  return deviceType === 'tablet';
}

export function useIsDesktop(): boolean {
  const deviceType = useDeviceType();
  return deviceType === 'desktop';
}