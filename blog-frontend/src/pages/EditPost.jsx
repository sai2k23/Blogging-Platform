import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { UserContext } from "../context/UserContext";
import BackToDashboard from "../components/GoBackButton";
const EditPost = () => {
  const { slug } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    axios
      .get(`https://blog-backend-bqf8.onrender.com/api/posts/slug/${slug}`)
      .then((res) => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setCoverImage(post.coverImage || "");
      })
      .catch((err) => {
        console.error("Failed to fetch post", err);
        alert("Error loading post.");
      });
  }, [slug]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://blog-backend-bqf8.onrender.com/api/posts/${slug}`, {
        title,
        content,
        coverImage,
      });
      alert("Post updated!");
      navigate("/my-posts");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update post");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <BackToDashboard />
        <h2 className="text-xl font-bold mb-2">✍️ Edit Markdown</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Cover image URL"
          className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          onClick={handleUpdate}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">👀 Live Preview</h2>
        <div className="prose dark:prose-invert max-w-none border p-4 rounded-md bg-white dark:bg-gray-800">
          <h1>{title}</h1>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
