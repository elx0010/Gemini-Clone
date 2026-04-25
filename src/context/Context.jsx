import { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [resultData, setResultData] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [prevPrompts, setPrevPrompts] = useState([]);

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
        setResultData("");
        setLoading(false);
        setShowResult(false);
        setInput("");
        setRecentPrompt("");
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        setPrevPrompts(prev => prev.includes(prompt) ? prev : [...prev, prompt])
        try {
            const response = await run(prompt);
            // Format bold text
            let responseArray = response.split("**");
            let formatted = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i % 2 === 1) {
                    formatted += "<b>" + responseArray[i] + "</b>";
                } else {
                    formatted += responseArray[i];
                }
            }
            // Split into words and type them out one by one
            const words = formatted.split(" ");
            for (let i = 0; i < words.length; i++) {
                delayPara(i, words[i] + " ");
            }
        } catch (err) {
            if (err.message && err.message.includes('429')) {
                setResultData("Daily limit reached. Please try again tomorrow");
            } else {
                setResultData("Error: " + err.message);
            }
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        input, setInput,
        recentPrompt,
        prevPrompts,
        resultData,
        loading,
        showResult,
        onSent,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;