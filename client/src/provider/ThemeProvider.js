import { useState } from "react";
import ThemeContext from "../context/ThemeContext.js";


export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState("dark")

    const toggleTheme = () => {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark' ));
    }

    const value = {
        theme, toggleTheme,

    }

        return <ThemeContext.Provider value={value}> {children} </ThemeContext.Provider>
    }

    export default ThemeProvider;