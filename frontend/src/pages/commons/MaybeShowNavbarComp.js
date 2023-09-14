import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const pathPatternsToHideNavbar = [
  /^\/CustomerDashboard(\/|$)/,
  /^\/AdminDashboard(\/|$)/,
];

const MaybeShowNavbarComp = ({ children }) => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const shouldHideNavbar = pathPatternsToHideNavbar.some(pattern =>
      pattern.test(location.pathname)
    );
    setShowNavbar(!shouldHideNavbar);
  }, [location]);

  return <>{showNavbar && children}</>;
};

export default MaybeShowNavbarComp;
