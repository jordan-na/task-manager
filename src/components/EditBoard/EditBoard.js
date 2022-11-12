import ThemeContext from "../../context/theme-context/theme-context";
import BoardContext from "../../context/board-context/board-context";
import classes from "./EditBoard.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import Input from "../UI/Input";
import trashDark from "../../assets/trash-dark.svg";
import trashLight from "../../assets/trash-light.svg";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import Storage from "../../utils/storage";

const EditBoard = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let editBoardClasses = `${classes["edit-board"]} `;
   let trashIconSrc;

   if (themeContext.theme === "light") {
      editBoardClasses += `${classes.light}`;
      trashIconSrc = trashLight;
   } else if (themeContext.theme === "dark") {
      editBoardClasses += `${classes.dark}`;
      trashIconSrc = trashDark;
   }

   const [editedBoardData, setEditedBoardData] = useState({
      title: boardContext.selectedBoard && boardContext.selectedBoard.title,
      columnsToRemove: [],
   });
   const [formIsValid, setFormIsValid] = useState(true);
   const [boardNameInUse, setBoardNameInUse] = useState(false);

   const boards = boardContext.boardIds.map((id) => Storage.getValue(id));

   const columnsToShow = boardContext.selectedBoard && boardContext.selectedBoard.columns.filter((column) => {
      return !editedBoardData.columnsToRemove.includes(column.id);
   });

   const updateBoardTitleHandler = (evt) => {
      if(isValidInput(evt.target.value)) {
         setFormIsValid(true);
         setEditedBoardData((editedBoardData) => {
            return {
               ...editedBoardData,
               title: evt.target.value,
            };
         });
      } else {
         setFormIsValid(false);
      }

   };

   const isValidInput = (val) => {
      const validLength = val.trim().length > 0;
      const nameNotInUse = !boards.some((board) => board.title === val && board.title !== boardContext.selectedBoard.title);
      if (!nameNotInUse) setBoardNameInUse(true);
      else setBoardNameInUse(false);
      return validLength && nameNotInUse;
   };

   const addColumnToRemoveHandler = (columnId) => {
      setEditedBoardData((editedBoardData) => {
         return {
            ...editedBoardData,
            columnsToRemove: editedBoardData.columnsToRemove.concat(columnId),
         };
      });
   };

   const editBoardHandler = (evt) => {
      evt.preventDefault();
      if(formIsValid) {
         boardContext.changeBoardTitle(editedBoardData.title);
         boardContext.removeColumns(...editedBoardData.columnsToRemove);
         props.onRemove();
      }
   };

   let columnsContent;

   if(columnsToShow) {
      if (columnsToShow.length === 0) {
         columnsContent = <h3 className={classes["no-columns-mssg"]}>No Columns</h3>;
      } else {
         columnsContent = columnsToShow.map((column) => {
            return (
               <li key={uuid()}>
                  <span>{column.title}</span>
                  <button
                     type="button"
                     className={classes["delete-button"]}
                     onClick={addColumnToRemoveHandler.bind(null, column.id)}
                  >
                     <img src={trashIconSrc} alt="trash-icon" />
                  </button>
               </li>
            );
         });
      }
   }


   return (
      <Modal onCloseModal={props.onRemove}>
         <form onSubmit={editBoardHandler} className={editBoardClasses}>
            <h2>Edit Board</h2>
            <Input
               label={"Name"}
               input={{
                  type: "text",
                  defaultValue: boardContext.selectedBoard && boardContext.selectedBoard.title,
                  onChange: updateBoardTitleHandler,
               }}
               errorMessage={"Board name already in use"}
               showErrorMessage={boardNameInUse}
            />
            <div>
               <label className={classes.label}>Columns</label>
               <ul className={classes["columns-list"]}>
                  {columnsContent}
               </ul>
            </div>
            <button className={`${classes.button} ${formIsValid ? "" : classes.invalid}`}>Okay</button>
         </form>
      </Modal>
   );
};

export default EditBoard;
