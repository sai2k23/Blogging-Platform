import { useNavigate } from "react-router-dom";

const GoBackButton = ({ label = "← Go Back" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-indigo-600 dark:text-indigo-300 hover:underline text-sm font-medium mb-4"
    >
      {label}
    </button>
  );
};

export default GoBackButton;
