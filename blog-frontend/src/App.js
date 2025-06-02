import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import WritePost from "./pages/WritePost";
import MyPosts from "./pages/MyPosts";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Settings from "./pages/Settings";
import "./App.css";
import "./index.css";
function App() {
  return (
    <GoogleOAuthProvider clientId="716320937843-r8s7s8b9nub95btsg3skbe3icp07vcuv.apps.googleusercontent.com">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {" "}
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/write-post"
              element={
                <ProtectedRoute>
                  <WritePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <MyPosts />
                </ProtectedRoute>
              }
            />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/edit-post/:slug" element={<EditPost />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
