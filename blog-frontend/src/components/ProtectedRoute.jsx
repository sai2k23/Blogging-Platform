// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext.js";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  useEffect(() => {
    console.log("ProtectedRoute | user:", user, "loading:", loading);
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-indigo-600">
        Checking credentials...
      </div>
    );
  }

 // if (!user) {
    //return <Navigate to="/" replace />;
  //}

  return children;
};

export default ProtectedRoute;
