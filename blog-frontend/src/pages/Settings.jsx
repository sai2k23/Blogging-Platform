import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../components/GoBackButton.jsx";
import axios from "axios";

const Settings = () => {
  const { user, setUser, logout } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [picture, setPicture] = useState(user?.picture || "");
  const [role, setRole] = useState(user?.role || "reader");

  const navigate = useNavigate();

  const handleUpdate = async () => {
    const updatedUser = { ...user, name, bio, picture, role };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated!");
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account permanently?"
      )
    ) {
      try {
        await axios.delete(`https://blog-backend-bqf8.onrender.com/api/users/${user._id}`);
        logout();
        navigate("/");
      } catch (err) {
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <BackToDashboard />
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Profile Picture URL</label>
          <input
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="reader">Reader</option>
            <option value="writer">Writer</option>
            <option value="both">Reader + Writer</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleUpdate}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save Changes
          </button>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
