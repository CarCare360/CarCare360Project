import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { role } = useAuth();
  const content = allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/Unauthorized" />
  );
  return content;
};

export default RequireAuth;
