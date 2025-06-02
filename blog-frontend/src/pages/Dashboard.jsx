import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const displayName = user?.name || user?.fullName || user?.email || "User";
  

  const isValidPicture = user?.picture?.startsWith("http");

  const profileImage = isValidPicture
    ? user.picture
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName
      )}&background=4F46E5&color=fff`;

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Welcome,{" "}
            <span className="text-indigo-600 dark:text-indigo-300">
              {displayName.toUpperCase()}
            </span>
          </h1>
        </div>

        {/* Profile image */}
        <div className="flex justify-center mb-8">
          <img
            src={profileImage}
            alt="Profile"
            referrerPolicy="no-referrer"
           className="w-32 h-32 rounded-full ring-4 ring-indigo-500 shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/write-post"
            className="rounded-xl bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 p-6 shadow-lg text-center transition transform hover:scale-105 border dark:border-gray-700"
          >
            <div className="text-3xl mb-2">✍️</div>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">
              Write a Post
            </p>
          </Link>

          <Link
            to="/my-posts"
            className="rounded-xl bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 p-6 shadow-lg text-center transition transform hover:scale-105 border dark:border-gray-700"
          >
            <div className="text-3xl mb-2">📚</div>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">
              My Posts
            </p>
          </Link>

          <Link
            to="/settings"
            className="rounded-xl bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 p-6 shadow-lg text-center transition transform hover:scale-105 border dark:border-gray-700"
          >
            <div className="text-3xl mb-2">⚙️</div>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">
              Settings
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
