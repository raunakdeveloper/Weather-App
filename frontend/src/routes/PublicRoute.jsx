import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ component: Component }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PublicRoute;

