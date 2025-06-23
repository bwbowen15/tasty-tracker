import { NextResponse } from "next/server"; // send HTTP response to Next.js API route
import OpenAI from "openai";   //from the OPENAI used for setup

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,  //gets the api key 
});



export async function POST(request){
    try{
        //expects a recipe and a goal, and an optional pantry list
        const { recipe, goal, pantry } = await request.json();
        
        //input validation
        if(!recipe || !goal){
            //missing data returns error 400 bad request
             return NextResponse.json({error: "Recipe and Goal are required"}, 
            {status: 400});
        }

        //here we have the prompt
        const prompt = `you are a fitness focused chef and nutritionist.
        rewrite the following recipe to help someone who wants to ${goal}.
        Take into account these ingredients that user has: ${pantry || "no restrictions"}.
        Include estimated calories and macros. 
        do not respons as if you are an AI just return the recipe. remember to include the calories and other macros every time no matter what.

        Recipe:
        ${recipe}

        Rewritten Recipe: 
        `;

        //open API info
        const response = await openai.responses.create({
        model: "gpt-4.1-nano",
        input: prompt ,
        }) 
       // console.log("response : ", response.output_text);


        //extract the result
        const rewrittenRecipe = response.output_text;
        return NextResponse.json({rewrittenRecipe});
    } catch(error){
        return NextResponse.json(
            {error : error.message || "AI error"},
            {status: 500}
        )
    }

    

    
}

