import classes from './ThemeToggle.module.css';
import lightModeLight from "../../../assets/light-mode-light.svg";
import lightModeDark from '../../../assets/light-mode-dark.svg';
import darkModeLight from '../../../assets/dark-mode-light.svg';
import darkModeDark from '../../../assets/dark-mode-dark.svg';
import ThemeContext from "../../../context/theme-context/theme-context";
import { useContext } from "react";

const ThemeToggle = () => {

   const themeContext = useContext(ThemeContext);

   let themeToggleClasses = `${classes['theme-toggle']} `;
   let lightModeSrc;
   let darkModeSrc;

   if (themeContext.theme === "light") {
      themeToggleClasses += `${classes.light}`
      lightModeSrc = lightModeLight;
      darkModeSrc = darkModeLight;
   } else if (themeContext.theme === "dark") {
      themeToggleClasses += `${classes.dark}`;
      lightModeSrc = lightModeDark;
      darkModeSrc = darkModeDark;
   }

   const changeThemeHandler = () => {
      themeContext.changeTheme();
   };

   return (
      <div className={themeToggleClasses}>
         <img src={lightModeSrc} alt="light mode" />
         <button onClick={changeThemeHandler} className={`${classes['toggle-switch']}`}>
            <span className={classes.circle}></span>
         </button>
         <img src={darkModeSrc} alt="dark mode" />
      </div>
   );
};

export default ThemeToggle;