"use client" // this uses react client side features(useState) this only works in the browser not the server


import { useState } from "react";

const RecipeForm = ({onResult}) => {
    const [recipe, setRecipe] = useState(""); //users  recipe
    const [goal, setGoal] = useState(""); // users goal
    const [pantry, setPantry] = useState(""); //optional pantry ingredients
    const [loading, setLoading] = useState(false); // show loading when api call

    //called when form is submitted
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        onResult("");

        try{
        //send POST request
            const res = await fetch("/api/rewrite", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ recipe, goal, pantry }), //send user input as JSON
        });
        const data = await res.json() // parse json response
        
        //pass result or error msg
        onResult(data.rewrittenRecipe || data.error || "Something went wrong.");
        } catch(err){
            //if something goes wrong show error
            onResult("Failed to connect to server");
        } finally{
        setLoading(false); // stop loading
        }
    };

    //return 
    return(
        <form
        onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1.5rem",
            }}>

            {/*text area for the original recipe*/ }
            <textarea
                rows = "6"
                placeholder = "Write your recipe here..."
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                required
            />

            {/*Dropdown for goals */}
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="">Select a goal</option>
                <option value="lose weight">Lose Weight</option>
                <option value="gain muscle">Gain Muscle</option>
                <option value="high protein">High Protein</option>
            </select>

            {/*Optional pantry ingredients*/}
            <input 
                type="text"
                placeholder="Pantry ingredients (optional)"
                value={pantry}
                onChange={(e) => setPantry(e.target.value)}
            />

            {/*submit button(disabled during loading) */}
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Get Recipe"}
            </button>
        </form>
    )

    
}

export default RecipeForm;

