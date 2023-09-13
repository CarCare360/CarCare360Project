import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShowFooter = ({ children }) => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (location.pathname === '/AdminDashboard' ||location.pathname === '/AdminDashboard/forum' || location.pathname === '/AdminDashboard/register-vehicle' || location.pathname === '/AdminDashboard/manufacturer-recommendation' || location.pathname === '/AdminDashboard/message-system') {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);

  return <>{showFooter && children}</>;
};

export default MaybeShowFooter;
