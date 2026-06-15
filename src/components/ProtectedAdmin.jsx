import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({
  children,
}) {

  const isAdmin =
    localStorage.getItem("adminAuth");

  return isAdmin === "true"
    ? children
    : <Navigate to="/adminlogin" />;
}