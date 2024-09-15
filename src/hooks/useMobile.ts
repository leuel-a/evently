import { useEffect, useState } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleWindowSizeChange() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
  }

  // handling component lifecycle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleWindowSizeChange);

      return () => window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return {
    isMobile,
  };
}
