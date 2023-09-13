import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShowNavbarComp = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (location.pathname === '/AdminDashboard' ||location.pathname === '/forum' || location.pathname === '/register-vehicle' || location.pathname === '/manufacturer-recommendation' || location.pathname === '/message-system') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <>{showNavbar && children}</>;
};

export default MaybeShowNavbarComp;
