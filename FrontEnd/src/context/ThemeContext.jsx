import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize state from localStorage or default
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove old classes
        root.classList.remove('dark', 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);

        // Apply Font Size
        // We'll use a data attribute for font size to handle it in CSS if needed
        // or just set a base font-size on the html element
        let scale = 100;
        if (fontSize === 'small') scale = 85;
        if (fontSize === 'large') scale = 115;

        root.style.fontSize = `${scale}%`;
        localStorage.setItem('fontSize', fontSize);

    }, [theme, fontSize]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
