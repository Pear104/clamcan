import { Navigate } from "react-router-dom";
import { sAuth } from "../stores/authStore";
import Loading from "./Loading";
import { isTokenExpired } from "app/modules/jwtUtils";

function PrivateRoute({ children, redirectUrl, allowedRoles }) {
  const auth = sAuth.use();

  // if (auth.isLoading) {
  //   // Return a loading screen while fetching the auth status
  //   return <Loading />;
  // }

  // Check if the user is authenticated and has allowed role to access the route
  return auth?.isAuthenticated &&
    !isTokenExpired() &&
    allowedRoles.includes(auth?.role) ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectUrl} />
  );
}

export default PrivateRoute;
