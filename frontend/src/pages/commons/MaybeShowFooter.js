import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShowFooter = ({ children }) => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (location.pathname === '/AdminDashboard' ||location.pathname === '/forum' || location.pathname === '/register-vehicle' || location.pathname === '/manufacturer-recommendation' || location.pathname === '/message-system') {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);

  return <>{showFooter && children}</>;
};

export default MaybeShowFooter;
