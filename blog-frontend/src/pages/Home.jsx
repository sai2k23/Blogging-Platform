import Lottie from "lottie-react";
import animationData from "../pages/Animation/HomePage-Animation.json";

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🔁 Background Animation */}
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 📝 Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to NoteHarbor</h1>
          <p className="text-lg text-gray-600 mt-2">Start exploring insightful posts and share your voice!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
