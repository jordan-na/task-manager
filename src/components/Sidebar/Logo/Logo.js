import ThemeContext from "../../../context/theme-context/theme-context";
import { useContext } from "react";
import classes from "./Logo.module.css";
import logo from "../../../assets/logo.svg";

const Logo = (props) => {
   const themeContext = useContext(ThemeContext);

   let logoClasses = `${classes.logo} `;

   if (themeContext.theme === "light") logoClasses += `${classes.light}`;
   else if (themeContext.theme === "dark") logoClasses += `${classes.dark}`;
   if(props.hideText) logoClasses += ` ${classes['hide-text']}`

   return (
      <div className={logoClasses}>
         <button className={classes.hamburger} onClick={props.onShowSidebar}>
            <img src={logo} alt="logo" />
         </button>
         <h2>Tasks</h2>
      </div>
   );
};

export default Logo;
