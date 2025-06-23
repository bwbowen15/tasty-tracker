import { useState } from "react";
import AuthPage from "../LoginPage";

const LoginButton = ({ onLoginClick }) => {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <AuthPage />;
  }

  return (
    <button
      type="button"
      className="text-white bg-black border border-white
        hover:bg-white hover:text-black
        focus:outline-none focus:ring-4 focus:ring-white
        font-medium rounded-lg text-sm px-5 py-2.5"
      onClick={onLoginClick}
    >
      Login
    </button>
  );
};

export default LoginButton;