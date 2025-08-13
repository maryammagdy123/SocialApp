import { useContext, useEffect } from "react";
import { Navigate } from "react-router"
import { UserDataContext } from "../Context/UserDataContext";


export function RoutingGuard({ children }) {
  let { user, getLoggedUserData } = useContext(UserDataContext);

	// if a user
  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getLoggedUserData();
    }
  });

  // if not a user
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
}