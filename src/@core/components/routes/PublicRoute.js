// ** React Imports
import { Suspense } from "react";

const PublicRoute = ({ children }) => {
  return <Suspense fallback={null}>{children}</Suspense>;
};

export default PublicRoute;
