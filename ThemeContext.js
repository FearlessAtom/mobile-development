import { lightTheme, darkTheme } from "./themes.js";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) =>
{
    const [theme, setTheme] = useState(darkTheme);

    const toggleTheme = () =>
    {
        setTheme(previous_theme => (previous_theme.dark ? lightTheme : darkTheme));
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () =>
{
    const context = useContext(ThemeContext);

    if (!context)
    {
        throw new Error("useTheme must be within a ThemeProvider");
    }

    return context;
}
