"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(isLogin ? "Logging in..." : "Signing up...");

    if (isLogin) {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMessage(`Error: ${error.message}`);
      else setMessage("Logged in successfully!");
    } else {
      // SIGNUP
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setMessage(`Error: ${error.message}`);
      else setMessage(
        "Signup successful! Please check your email to confirm your account."
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="relative max-w-md w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </h1>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  marginLeft: 12,
                  background: "#f3f4f6",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontWeight: "bold",
                  cursor: "pointer",
                  zIndex: 1001,
                  fontSize: 20,
                  lineHeight: "32px",
                }}
                aria-label="Close Login"
              >
                ×
              </button>
            )}
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* You can optionally add Remember Me for login */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50
                      focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600
                      dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700
                focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
                rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLogin ? "Sign in" : "Sign up"}
            </button>

            {message && (
              <p
                className={`text-center mt-4 ${
                  message.startsWith("Error") ? "text-red-500" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {isLogin
                ? "Don’t have an account yet? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsLogin(!isLogin);
                }}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
