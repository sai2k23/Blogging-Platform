# 📝 NoteHarbor – Modern Blog Platform

Welcome to **NoteHarbor**, a full-stack blogging platform that empowers users to write, share, and manage content with ease. Built using the MERN stack with Google OAuth integration, rich markdown editing, and elegant Tailwind styling.

## 🌟 Live Demo

[![Live - VisualExcel](https://img.shields.io/badge/Live%20Demo-Click%20Here-0f62fe?style=for-the-badge&logo=netlify&logoColor=white)](https://noteharborplatform.netlify.app)

---

## 🚀 Features

- 🔐 **Google OAuth Login** – Secure login with your Google account.
- ✍️ **Rich Markdown Editor** – Write beautifully formatted posts.
- 🧠 **Live Preview** – Instantly preview what you write.
- 📚 **My Posts Dashboard** – View, edit, delete, or draft your posts.
- 💬 **Comments (planned)** – Engage with readers (coming soon).
- 👍 **Likes & Views** – Fake stats with real-time UX feedback.
- 🌓 **Dark Mode** – Built-in theme toggle for personalized experience.
- ⚙️ **Settings Page** – Update name, bio, avatar, role, or delete account.
- 🖼️ **Cover Image Support** – Optional blog header images.
- 🔗 **SEO-friendly Slugs** – Clean URLs like `/post/my-first-blog-post`.

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Google OAuth via Passport.js
- **Deployment**:
  - Frontend → [Netlify](https://netlify.com)
  - Backend → [Render](https://render.com)

---

## ⚙️ Local Setup

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/Blogging-Platform.git
cd Blogging-Platform
 ### 2. Backend Setup
```bash
cd blog-backend
npm install
touch .env
### Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
