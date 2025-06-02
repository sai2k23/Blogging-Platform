import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import GoBackButton from "../components/GoBackButton.jsx";
import animationData from "../pages/Animation/Login-Animation.json";
import loginformAnimation from "../pages/Animation/Login-form-Animation.json";
import successAnimation from "../pages/Animation/Registration-Completed-Animation.json";

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      login(decoded); // 🔥 this sets localStorage + context
      console.log("Decoded User", decoded); // make sure 'picture' exists
      toast.success("Signed in with Google successfully!");
      // Show animation first, then navigate after delay
      setIsLoggedIn(true);
      setTimeout(() => navigate("/dashboard"), 2000); // wait 2s
    } catch (err) {
      console.error("❌ Google Login Error:", err);
      toast.error("Google Login Failed!");
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-teal-500 px-4">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: 300, height: 300 }}
        />
        <h2 className="text-2xl font-bold text-white mt-4">
          Login Successful!
        </h2>
        <p className="text-white mt-2">Welcome to Zidio Blog 🎉</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      {!showForm ? (
        <Lottie
          animationData={animationData}
          loop={false}
          style={{ height: 300, width: 300 }}
        />
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
             <GoBackButton />
          {/* 🌀 Top Animation */}
          <div className="flex justify-center mb-6">
            <Lottie
              animationData={loginformAnimation}
              loop
              style={{ height: 150, width: 150 }}
            />
          </div>

          {/* 🔐 Google Sign-In */}
          <div className="w-full max-w-md bg-white p-8 rounded-2xl  animate-fade-in">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                toast.error("❌ Google Sign-in Failed. Please try again!")
              }
            />
          </div>

          {/* 🔏 Manual Login */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login to Zidio Blog
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
