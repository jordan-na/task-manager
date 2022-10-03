import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";
import Storage from "../../utils/storage";

const storedTheme = Storage.getValue("theme");

const ThemeProvider = (props) => {
   const [theme, setTheme] = useState(storedTheme ? storedTheme : "dark");

   useEffect(() => {
      Storage.setValue("theme", theme);
   }, [theme]);

   const changeTheme = () => {
      setTheme((prevTheme) => {
         if (prevTheme === "dark") return "light";
         else if (prevTheme === "light") return "dark";
      });
   };

   const context = {
      theme: theme,
      changeTheme: changeTheme,
   };

   return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>;
};

export default ThemeProvider;
