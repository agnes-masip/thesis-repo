import React from "react";
import { Navigate, useParams } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  const { username } = useParams();

  if (document.cookie !== 'username=' + username) {
    return <Navigate to="/login"/>
  }

  return children;
};