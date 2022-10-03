import classes from "./KebabMenu.module.css";
import ThemeContext from "../../context/theme-context/theme-context";
import { useContext, useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import MobileThemeToggle from "./MobileThemeToggle/MobileThemeToggle";

const KebabMenu = (props) => {
   const themeContext = useContext(ThemeContext);

   let kebabClasses = `${props.className} ${classes.kebab} `;

   if (themeContext.theme === "light") {
      kebabClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      kebabClasses += `${classes.dark}`;
   }

   const [showMenu, setShowMenu] = useState(null);

   let menuAnimation;

   if (showMenu === true) menuAnimation = classes["show"];
   else if (showMenu === false) menuAnimation = classes["hide"];

   const toggleMenuHandler = () => {
      setShowMenu((prev) => !prev);
   };

   const menuItemClickHandler = (clickHandler) => {
      setShowMenu(false);
      clickHandler();
   };

   const  useOutsideClickHandler = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               if (showMenu) setShowMenu(false);
            }
         }
         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref, showMenu]);
   }

   const wrapperRef = useRef(null);
   useOutsideClickHandler(wrapperRef);

   return (
      <div ref={wrapperRef} className={kebabClasses}>
         <button className={classes["kebab-button"]} onClick={toggleMenuHandler}>
            <div></div>
            <div></div>
            <div></div>
         </button>
         <ul className={`${classes.menu} ${menuAnimation}`}>
            {props.hasNewBoardButton && (
               <li
                  className={`${classes["menu-item"]} ${classes["new-board-button"]}`}
                  key={uuid()}
                  onClick={menuItemClickHandler.bind(null, props.onShowNewBoard)}
               >
                  New Board
               </li>
            )}
            {props.menu.map((item) => (
               <li
                  className={`${classes["menu-item"]} ${item.disabled ? classes.disabled : ""}`}
                  key={uuid()}
                  onClick={menuItemClickHandler.bind(null, item.onClick)}
               >
                  {item.name}
                  {item.icon && <img src={item.icon} alt="menu-icon" />}
               </li>
            ))}
            {props.hasThemeToggle && (
               <li className={classes["mobile-theme-toggle"]}>
                  <MobileThemeToggle onThemeChange={menuItemClickHandler} />
               </li>
            )}
         </ul>
      </div>
   );
};

export default KebabMenu;
