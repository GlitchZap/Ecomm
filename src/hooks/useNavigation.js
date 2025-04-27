import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // This effect will run on component mount to ensure proper navigation
  useEffect(() => {
    // Force an update when the component mounts to ensure proper routing
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '') {
      navigate('/home', { replace: true });
    }
  }, [location.pathname, navigate]);
  
  return { currentPath: location.pathname };
}