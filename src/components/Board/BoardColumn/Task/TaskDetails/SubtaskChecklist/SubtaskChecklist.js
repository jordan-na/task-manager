import classes from "./SubtaskChecklist.module.css";
import checkmark from "../../../../../../assets/checkmark.svg";
import ThemeContext from "../../../../../../context/theme-context/theme-context";
import { useContext } from "react";
import BoardContext from "../../../../../../context/board-context/board-context";

const SubtaskChecklist = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let theme;

   if (themeContext.theme === "light") {
      theme = classes.light;
   } else if (themeContext.theme === "dark") {
      theme = classes.dark;
   }

   return (
      <div className={theme}>
         <label className={classes.label}>
            Subtasks ({props.subtasksDone} of {props.subtasks.length})
         </label>
         <ul className={classes.subtasks}>
            {props.subtasks.map((subtask) => {
               return (
                  <li
                     id={subtask.id}
                     key={subtask.id}
                     className={`${classes.subtask} ${subtask.done ? classes.done : ""}`}
                     onClick={boardContext.toggleFinishSubtask.bind(null, props.columnId, props.taskId, subtask.id, !subtask.done)}
                  >
                     <span className={classes.checkbox}>
                        <img className={classes.checkmark} src={checkmark} alt="checkmark" />
                     </span>
                     <span className={classes["subtask-text"]}>{subtask.subtask}</span>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default SubtaskChecklist;
