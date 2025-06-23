// this pretty much just displays the recipe or error message 
// only renders if there is something to show

const ResultDisplay = ({ result }) => {
    //no result to show
    if(!result) return null;


    return(
        <pre
            style={{
                whiteSpace: "pre-wrap", //line breaks and wraps text
                marginTop: "2rem", //space above box
                background: "#f4f4f4", //background color
                padding: "1rem", //inner padding
                borderRadius: "6px", //rounded corners
            }}
        >
            {result}

        </pre>
    );

}

export default ResultDisplay;