// ** React Imports
import { Navigate } from "react-router-dom";
import { Suspense } from "react";

// ** Context Imports
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  if (route) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PrivateRoute;
