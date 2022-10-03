import classes from "./Header.module.css";
import ThemeContext from "../../context/theme-context/theme-context";
import BoardContext from "../../context/board-context/board-context";
import { useContext } from "react";
import KebabMenu from "../UI/KebabMenu";
import trashIconDark from "../../assets/trash-dark.svg";
import editIcon from "../../assets/edit.svg";
import openWindowIcon from "../../assets/open-window.svg";
import downArrow from "../../assets/arrow.svg";
import MobileBoardNav from "./MobileBoardNav/MobileBoardNav";
import { useState, useEffect, useRef } from "react";

const Header = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let headerClasses = `${classes.header} `;

   if (themeContext.theme === "light") {
      headerClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      headerClasses += `${classes.dark}`;
   }

   const [showMobileBoardNav, setShowMobileBoardNav] = useState(false);

   const editBoardHandler = () => {
      props.onShowEditBoard();
   };

   const viewSourceCodeHandler = () => {
      window.open("https://github.com/jordan-na/task-manager.git");
   };

   const toggleBoardNavHandler = () => {
      setShowMobileBoardNav((prev) => !prev);
   };

   const useOutsideClickHandler = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               if (showMobileBoardNav) setShowMobileBoardNav(false);
            }
         }
         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref, showMobileBoardNav]);
   };

   const wrapperRef = useRef(null);
   useOutsideClickHandler(wrapperRef);

   return (
      <header className={headerClasses}>
         <div
            ref={wrapperRef}
            className={`${classes["board-name-container"]} ${boardContext.boardIds.length <= 1 ? classes["no-pointer-events"] : ""}`}
            onClick={toggleBoardNavHandler}
         >
            <h1 className={classes["board-name"]}>
               {boardContext.selectedBoard ? boardContext.selectedBoard.title : ""}
            </h1>
            <img className={`${classes.arrow} ${showMobileBoardNav ? classes.flip : ""}`} src={downArrow} alt="arrow" />
            <MobileBoardNav show={showMobileBoardNav} />
         </div>
         <div className={classes.buttons}>
            <button onClick={props.onShowAddNewTask} className={classes["new-task-button"]}>
               + <span>Add New Task</span>
            </button>
            <KebabMenu
               menu={[
                  {
                     name: "Edit Board",
                     onClick: editBoardHandler,
                     disabled: !boardContext.selectedBoard,
                     icon: editIcon,
                  },
                  {
                     name: "Delete Board",
                     onClick: boardContext.removeBoard,
                     disabled: !boardContext.selectedBoard,
                     icon: trashIconDark,
                  },
                  {
                     name: "View Source Code",
                     onClick: viewSourceCodeHandler,
                     icon: openWindowIcon,
                  },
               ]}
               hasThemeToggle={true}
               hasNewBoardButton={true}
               onShowNewBoard={props.onShowNewBoard}
            />
         </div>
      </header>
   );
};

export default Header;
