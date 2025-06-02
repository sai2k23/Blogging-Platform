import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Lottie from "lottie-react";
import successAnimation from "../pages/Animation/Registration-Completed-Animation.json";
import GoBackButton from "../components/GoBackButton.jsx";
const Register = () => {
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "reader",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

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

  if (submitted || isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-teal-500 px-4">
        <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ width: 300, height: 300 }}
        />
        <h2 className="text-2xl font-bold text-white mt-4">
          Welcome to Zidio Blog 🎉
        </h2>
        <p className="text-white mt-2">
          {submitted ? "Registration Successful!" : "Login Successful!"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl animate-fade-in">
        <GoBackButton />
        {/* ✅ Google Sign-In */}
        <div className="w-full mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() =>
              toast.error("❌ Google Sign-in Failed. Please try again!")
            }
            width="100%"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4">
                Step 1: Basic Info
              </h2>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="mb-4 w-full px-4 py-2 border rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4">
                Step 2: Set Password
              </h2>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mb-4 w-full px-4 py-2 border rounded-md"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4">
                Step 3: Choose Role
              </h2>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border rounded-md"
              >
                <option value="reader">Reader</option>
                <option value="writer">Writer</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Register
              </button>
            </>
          )}
        </form>

        {/* 🔄 Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
