import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import BackToDashboard from "../components/GoBackButton";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
const MyPosts = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
 // const navigate = useNavigate();
  useEffect(() => {
    if (user?._id) {
      axios
        .get(`https://blog-backend-bqf8.onrender.com/api/posts/user/${user._id}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`https://blog-backend-bqf8.onrender.com/api/posts/${postId}`);
        setPosts(posts.filter((p) => p._id !== postId));
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <BackToDashboard />
      <h1 className="text-3xl font-bold mb-6">📚 My Posts</h1>

      <div className="grid sm:grid-cols-2 gap-6">

        {posts.map((post) => (
          <div
            key={post._id}
            className="border dark:border-gray-700 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
          >
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt="cover"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}

            <Link
              to={`/post/${post.slug}`}
              className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 hover:underline mb-1 block"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <div className="flex gap-3">
              <Link
                to={`/edit-post/${post.slug}`}
                className="text-blue-500 hover:underline text-sm"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline text-sm"
              >
                🗑 Delete
              </button>
              {post.isDraft && (
                <span className="ml-auto text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                  Draft
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
