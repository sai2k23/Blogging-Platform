import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { FiGrid, FiMoon, FiSun } from "react-icons/fi"; 
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
const Header = () => {
 const { user, logout, setUser, darkMode, setDarkMode } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("Invalid user session");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("https://blog-backend-bqf8.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold flex items-center gap-2">
        📰 <span className="hidden sm:inline">NoteHarbor</span>
      </h1>

      <nav className="flex gap-6 items-center">
        <Link
          to="/"
          className="transition duration-300 ease-in-out hover:scale-105 hover:text-indigo-400"
        >
          <span className="inline-block transition-transform duration-300 hover:animate-bounce">
            <FiHome />
          </span>{" "}
          Home
        </Link>
        {user && (
          <Link
            to="/dashboard"
            className="transition duration-300 ease-in-out hover:scale-105 hover:text-cyan-400" 
          >
          
            <span className="inline-block transition-transform duration-300 hover:animate-bounce">
      
    <FiGrid />
            </span>{" "}
             Dashboard
          </Link>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="transition duration-300 ease-in-out hover:scale-105 hover:text-amber-300 "
            >
              <span className="inline-block transition-transform duration-300  hover:animate-bounce">
                <FiLogIn />
              </span>{" "}
              Login
            </Link>

            <Link
              to="/register"
              className="transition duration-300 ease-in-out hover:scale-105 hover:text-rose-300"
            >
              <span className="inline-block transition-transform duration-300 hover:animate-wiggle">
                <FiUserPlus />
              </span>{" "}
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm sm:text-base font-medium text-green-300">
              👋 {user.name || user.fullName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 text-lg bg-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-600 transition"
          title="Toggle Theme"
        >
          {darkMode ? <FiSun /> : <FiMoon /> }
        </button>
      </nav>
    </header>
  );
};

export default Header;
