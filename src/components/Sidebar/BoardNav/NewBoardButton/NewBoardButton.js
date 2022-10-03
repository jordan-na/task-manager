import classes from "./NewBoardButton.module.css";
import ThemeContext from "../../../../context/theme-context/theme-context";
import { useContext } from "react";
import boardIcon from "../../../../assets/board-purple.svg";

const NewBoardButton = (props) => {
   const themeContext = useContext(ThemeContext);

   let newBoardButtonClasses = `${classes.button} `;

   if (themeContext.theme === "light") newBoardButtonClasses += `${classes.light}`;
   else if (themeContext.theme === "dark") newBoardButtonClasses += `${classes.dark}`;

   return (
      <button className={newBoardButtonClasses} onClick={props.onClick}>
         <img src={boardIcon} alt="board-icon" />
         {props.children}
      </button>
   );
};

export default NewBoardButton;
