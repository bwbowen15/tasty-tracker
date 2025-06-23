"use client"
import { useState } from "react";
import RecipeForm from "./components/RecipeForm"
import ResultDisplay from "./components/ResultDisplay"
import LoginButton from "./components/LoginButton";
import AuthPage from "./LoginPage";


export default function Home() {
  const [result, setResult] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  
  return(
    <>
    <header className="flex items-center justify-between px-6 py-4 bg-black border-b border-white">
      <h1 className="text-2xl font-extrabold text-white tracking-wide select-none">
        Tasty Tracker
      </h1>
      <LoginButton onLoginClick={() => setShowLogin(true)} />
    </header>

    {/* Login Modal Overlay */}
    {showLogin && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ position: "relative" }}>
          <AuthPage onClose={() => setShowLogin(false)} />
        </div>
      </div>
    )}

    <main
      style={{
        maxWidth: 700,
        margin: "3rem auto",
        padding: "2rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        backgroundColor: "#f9fafb",
        borderRadius: 8,
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
      }}>
        <header style={{ marginBottom: "2rem", textAlign: "center"}}>
          <h1
            style={{
            fontWeight: "700",
            fontSize: "2.5rem",
            marginBottom: "0.25rem",
            color: "#2c3e50",
          }}>
            Tasty Tracker
          </h1>
          <p
          style={{
            fontSize: "1.15rem",
            color: "#4a5568",
            maxWidth: 480,
            margin: "0 auto",
          }}
          >
            Paste a recipe, select your fitness goal, and get a personalized, healthier version tailored just for you.
          </p>
        </header>

        <RecipeForm onResult={setResult}/>
        <ResultDisplay result={result}/>



      </main>
      </>
  )
  
}
