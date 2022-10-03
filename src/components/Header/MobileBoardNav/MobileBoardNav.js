import classes from "./MobileBoardNav.module.css";
import ThemeContext from "../../../context/theme-context/theme-context";
import BoardContext from "../../../context/board-context/board-context";
import { useContext } from "react";
import Storage from "../../../utils/storage";
import MobileBoardNavButton from "./MobileBoardNavButton/MobileBoardNavButton";
import { v4 as uuid } from "uuid";

const MobileBoardNav = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let mobileBoardNavClasses = `${classes["mobile-board-nav"]}  ${props.show ? "" : classes.hide} `;

   if (themeContext.theme === "light") {
      mobileBoardNavClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      mobileBoardNavClasses += `${classes.dark}`;
   }

   const boards = boardContext.boardIds.map((id) => Storage.getValue(id));

   const navigationButtons = boards.map((board) => {
      if (board.id !== boardContext.selectedBoard.id) {
         return (
            <MobileBoardNavButton
                  onClick={boardContext.changeSelectedBoard.bind(null, board.id)}
                  key={uuid()}
                  selected={true}
            >
               {board.title}
            </MobileBoardNavButton>
         );
      }
   });

   return (
      <ul className={mobileBoardNavClasses}>
         {navigationButtons}
      </ul>
   );
};

export default MobileBoardNav;
