import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import BackToDashboard from "../components/GoBackButton";
import { UserContext } from "../context/UserContext";
const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { user} = useContext(UserContext);

 useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://blog-backend-bqf8.onrender.com/api/posts/slug/${slug}`);
        setPost(res.data);

        // Increment view count
        await axios.put(`https://blog-backend-bqf8.onrender.com/api/posts/slug/${slug}/view`);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };
    fetchPost();
  }, [slug]);
const handleLike = async () => {
    try {
      const res = await axios.put(`https://blog-backend-bqf8.onrender.com/api/posts/slug/${slug}/like`);
      setPost(res.data);
    } catch (err) {
      console.error("Like failed", err);
    }
  };
  if (!post) return <div className="p-10 text-center">Loading post...</div>;
const authorName = user?.name || user?.fullName || user?.email || "Anonymous";
  const avatar = user?.picture?.startsWith("http")
    ? user.picture
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=4F46E5&color=fff`;
  return (
    <div className="max-w-4xl mx-auto p-6">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt="Cover"
          className="w-full h-64 object-cover mb-6 rounded-lg"
        />
      )}
      <BackToDashboard />
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{post.title}</h1>

     {/* 👤 Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt="Author"
          className="w-10 h-10 rounded-full border shadow"
        />
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <div className="font-medium">{authorName}</div>
          <div className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

       {/* 👍  Like & View Counters */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <button
          onClick={handleLike}
          className="hover:text-indigo-600 transition"
        >
          🔥 {post.likes} Likes
        </button>
        <span>👁 {post.views} Views</span>
      </div>
      <article className="prose dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default PostPage;
