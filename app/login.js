"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const LoninPage = () => {
    const [email, setEmail] = useState("") //email
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("Logging in...");


        const {error} = await supabase.auth.signInWithPassword(
        {
            email,
            password,
        });

        if(error){
        setMessage(`Error: ${error.message}`);
        }
        else{
        setMessage("Logged in!");
    }

    };
    return(
        <main style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input      
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    req
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </form>
        </main>
    )

    
    
}