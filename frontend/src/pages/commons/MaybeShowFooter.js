import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MaybeShowFooter = ({ children }) => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const hideFooterPaths = [
      /^\/CustomerDashboard(\/|$)/,
      /^\/AdminDashboard(\/|$)/,
    ];

    for (const path of hideFooterPaths) {
      if (path.test(location.pathname)) {
        setShowFooter(false);
        return; // Exit the loop early if a match is found
      }
    }

    setShowFooter(true);
  }, [location]);

  return <>{showFooter && children}</>;
};

export default MaybeShowFooter;
