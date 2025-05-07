'use client';

import { useState, useEffect } from 'react';

/**
 * Hook that returns true when viewport width is below the phone breakpoint
 * Matches --breakpoint-phone in global.css (950px)
 */
export function usePhone(): boolean {
  const [isPhone, setIsPhone] = useState(false);
  
  useEffect(() => {
    const PHONE_BREAKPOINT = 950; // Match --breakpoint-phone in global.css
    
    const checkIsPhone = () => {
      setIsPhone(window.innerWidth <= PHONE_BREAKPOINT);
    };
    
    // Check on mount
    checkIsPhone();
    
    // Add event listener
    window.addEventListener('resize', checkIsPhone);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsPhone);
  }, []);
  
  return isPhone;
} 