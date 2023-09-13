import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShowNavbarComp = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (location.pathname === '/AdminDashboard' ||location.pathname === '/AdminDashboard/forum' || location.pathname === '/AdminDashboard/register-vehicle' || location.pathname === '/AdminDashboard/manufacturer-recommendation' || location.pathname === '/AdminDashboard/message-system') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <>{showNavbar && children}</>;
};

export default MaybeShowNavbarComp;
