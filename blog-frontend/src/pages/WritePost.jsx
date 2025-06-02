import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import BackToDashboard from "../components/GoBackButton";

const WritePost = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  //const [isDraft, setIsDraft] = useState(false);

  const handleSubmit = async (publish = true) => {
    if (!user || !user._id) {
      alert("User not logged in properly. Please refresh and try again.");
      return;
    }

    const postData = {
      title,
      content: markdown,
      authorId: user._id,
      isDraft: !publish,

      coverImage: coverImage || "",
    };

    try {
      await axios.post("https://blog-backend-bqf8.onrender.com/api/posts/create", postData);
      alert(publish ? "Published successfully!" : "Draft saved!");
      setTitle("");
      setMarkdown("");
      setCoverImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save post");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Write Section */}
      <div>
        <BackToDashboard />
        <h2 className="text-xl font-bold mb-2">✍️ Write Markdown</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
         className="mt-4 w-full px-4 py-2 border rounded-md prose dark:prose-invert max-w-none  bg-white dark:bg-gray-800"

        />
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Start writing your awesome post..."
          rows="10"
          className="mt-4 w-full px-4 py-2 border rounded-md prose dark:prose-invert max-w-none  bg-white dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="Optional cover image URL"
          value={coverImage || ""}
          onChange={(e) => setCoverImage(e.target.value)}
          className="mt-4 w-full px-4 py-2 border rounded-md prose dark:prose-invert max-w-none  bg-white dark:bg-gray-800"
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => handleSubmit(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Publish
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Save as Draft
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div>
        <h2 className="text-xl font-bold mb-2">👀 Live Preview</h2>
        <div className="prose dark:prose-invert max-w-none border p-4 rounded-md bg-white dark:bg-gray-800">
          <h1>{title}</h1>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
