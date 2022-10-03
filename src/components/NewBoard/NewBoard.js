import classes from "./NewBoard.module.css";
import ThemeContext from "../../context/theme-context/theme-context";
import BoardContext from "../../context/board-context/board-context";
import Input from "../UI/Input";
import { useContext } from "react";
import Modal from "../UI/Modal";
import { useState } from "react";
import Storage from "../../utils/storage";

const NewBoard = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let newBoardClasses = `${classes["new-board"]} `;

   if (themeContext.theme === "light") {
      newBoardClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      newBoardClasses += `${classes.dark}`;
   }

   const [isValid, setIsValid] = useState(false);
   const [boardNameInUse, setBoardNameInUse] = useState(false);

   const boards = boardContext.boardIds.map((id) => Storage.getValue(id));

   const validateInputHandler = (evt) => {
      if (isValidInput(evt.target.value)) {
         setIsValid(true);
      } else {
         setIsValid(false);
      }
   };

   const isValidInput = (val) => {
      const validLength = val.trim().length > 0;
      const nameNotInUse = !boards.some((board) => board.title === val);
      if(!nameNotInUse) setBoardNameInUse(true);
      else setBoardNameInUse(false);
      return validLength && nameNotInUse;
   };

   const createNewBoardHandler = (evt) => {
      evt.preventDefault();
      if (isValidInput(evt.target[0].value)) {
         boardContext.createBoard(evt.target[0].value);
         props.onRemove();
      }
   };

   return (
      <Modal onCloseModal={props.onRemove}>
         <form onSubmit={createNewBoardHandler} className={newBoardClasses}>
            <h2 className={classes.title}>Create New Board</h2>
            <Input
               label="Name"
               input={{
                  id: "new-board__name",
                  type: "text",
                  placeholder: "e.g. Platform Launch",
                  onChange: validateInputHandler,
               }}
               errorMessage={"Board name already in use"}
               showErrorMessage={boardNameInUse}
            />
            <button className={`${classes.button} ${isValid ? "" : classes.invalid}`}>+ Create</button>
         </form>
      </Modal>
   );
};

export default NewBoard;
