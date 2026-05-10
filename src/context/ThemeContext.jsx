import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first, then system preference
        const saved = localStorage.getItem("cloudshare-theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
    
    const [forceTheme, setForceTheme] = useState(null);
    const actualIsDark = forceTheme === "light" ? false : forceTheme === "dark" ? true : isDark;

    useEffect(() => {
        const root = document.documentElement;
        if (actualIsDark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("cloudshare-theme", isDark ? "dark" : "light");
    }, [actualIsDark, isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark: actualIsDark, toggleTheme, setForceTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
