// file: ~/app/components/ThemeSwitcher.tsx
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        console.log(theme)
    }, [theme]);

    return (<>


        <button onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
    </>
    );
};

export default ThemeSwitcher;
