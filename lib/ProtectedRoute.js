// components/ProtectedRoute.js
import { Redirect } from "expo-router";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; 
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Redirect href="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;