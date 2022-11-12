import React, { useContext } from "react";
import classes from "./BoardColumn.module.css";
import Task from "./Task/Task";
import ThemeContext from "../../../context/theme-context/theme-context";

const BoardColumn = (props, ref) => {
   const themeContext = useContext(ThemeContext);

   let boardColumnClasses = `${classes["board-column"]} `;

   if (themeContext.theme === "light") {
      boardColumnClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      boardColumnClasses += `${classes.dark}`;
   }

   let emptyColumn = props.tasks.length === 0;

   return (
      <div className={boardColumnClasses}>
         <h3 className={classes.title}>
            <span className={classes.color} style={{ backgroundColor: props.color }}></span>
            {props.title} ({props.tasks.length})
         </h3>
         <ul className={classes.tasks}>
            {props.tasks.map((task, i) => (
               <Task
                  id={task.id}
                  status={task.status}
                  key={task.id}
                  taskTitle={task.task}
                  description={task.description}
                  subtasks={task.subtasks}
                  animationDelay={`${i / 20}s`}
               />
            ))}
         </ul>
         {emptyColumn && <h2 className={classes["empty-mssg"]}>No Tasks</h2>}
      </div>
   );
};

export default BoardColumn;
