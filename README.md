# Remix stack for MongoDB

This simple stack includes everything you need to run Remix with MongoDB. It includes examples for basic document fetches, as well as a form to add new entries.

Find out more in the article in the [MongoDB Dev Center](https://mdb.link/remix).

## Requirements

Create a new Remix application using this template.

```
npx create-remix@latest --template mongodb-developer/remix
```

You will also need a MongoDB cluster ready to go with some sample data. The easiest way to get started is with an Atlas free cluster.

- Create your free Atlas cluster ([tutorial](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/?utm_campaign=devrel&utm_source=cross-post&utm_source=tools&utm_medium=readme&utm_content=remix-stack&utm_term=joel.lord))
- Load the sample dataset ([docs](https://www.mongodb.com/docs/atlas/sample-data/?utm_campaign=devrel&utm_source=cross-post&utm_source=tools&utm_medium=readme&utm_content=remix-stack&utm_term=joel.lord))

## Getting started

In the root folder of the project, create a `.env` file. In this file, you will need to add your connection string. Check out the [docs](https://www.mongodb.com/docs/guides/atlas/connection-string/?utm_campaign=devrel&utm_source=cross-post&utm_source=tools&utm_medium=readme&utm_content=remix-stack&utm_term=joel.lord) to learn how to get your connection string with Atlas.

```
CONNECTION_STRING=mongodb+srv://username:password@cluster0.abcdef.mongodb.net/myFirstDatabase
```

Run a first build, and then start the development environment.

```
npm run build
npm run dev
```

Open your browser on [http://localhost:3000](http://localhost:3000), and start exploring your new application.

If you are using Tailwind CSS, the process would be slightly different but the main concept is similar. Tailwind CSS provides dark mode utilities which you can leverage to switch between light and dark themes.

Firstly, in your tailwind.config.js file, enable dark mode via the darkMode property:

javascript
Copy code
module.exports = {
darkMode: 'class',
// ...
}
In your CSS, define your dark styles:

css
Copy code
/_ file: ~/app/styles/global.css _/
.dark {
--tw-bg-opacity: 1;
background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
--tw-text-opacity: 1;
color: rgba(209, 213, 219, var(--tw-text-opacity));
}
In your ThemeContext and ThemeSwitcher components, the implementation will remain the same:

jsx
Copy code
// file: ~/app/contexts/ThemeContext.js
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ThemeContext.Provider;

export function useTheme() {
return useContext(ThemeContext);
}
jsx
Copy code
// file: ~/app/components/ThemeSwitcher.js
import { useTheme } from "../contexts/ThemeContext";

function ThemeSwitcher() {
const { theme, toggleTheme } = useTheme();

return (
<button onClick={toggleTheme}>
Switch to {theme === "light" ? "dark" : "light"} mode
</button>
);
}

export default ThemeSwitcher;
Then, in your root component, use the ThemeProvider to provide the theme state to your app and apply the dark class to the root element when the theme is dark:

jsx
Copy code
// file: ~/app/routes/index.js
import { useEffect, useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";

function Index() {
const [theme, setTheme] = useState("light"); // default theme

useEffect(() => {
// apply or remove the dark class on the body depending on the theme state
document.body.classList.toggle("dark", theme === "dark");
}, [theme]);

const toggleTheme = () => {
setTheme(theme === "light" ? "dark" : "light");
};

return (
<ThemeProvider value={{ theme, toggleTheme }}>
<div className="min-h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
<header>
<ThemeSwitcher />
</header>
{/_ rest of your app _/}
</div>
</ThemeProvider>
);
}

export default Index;
In this example, the useEffect hook listens for changes in the theme state and toggles the dark class on the body element accordingly. When the dark class is active, Tailwind will apply the dark variant styles.

Again, you might want to persist the user's theme preference in local storage or cookies so that it doesn't reset every time the page is refreshed.
