import React from "react";
import { Navigate, useParams } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  const { username } = useParams();

  console.log(document.cookie);

  if (document.cookie !== 'username=' + username) {
    console.log("back!");
    // navigate('/login', { replace: true });
    return <Navigate to="/"/>
  }
  return children;
};