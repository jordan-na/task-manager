import React from "react";
import classes from "./Task.module.css";
import ThemeContext from "../../../../context/theme-context/theme-context";
import { useContext, useState } from "react";
import TaskDetails from "./TaskDetails/TaskDetails";

const Task = (props) => {
   const subtasksDone = props.subtasks.reduce((accumulator, currTask) => {
      if(currTask.done) return accumulator + 1;
      return accumulator;
   }, 0);

   const themeContext = useContext(ThemeContext);

   let taskClasses = `${classes.task} `;

   if (themeContext.theme === "light") {
      taskClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      taskClasses += `${classes.dark}`;
   }

   const [showTaskDetails, setShowTaskDetails] = useState(false);

   const showTaskDetailsHandler = () => {
      setShowTaskDetails(true);
   };

   const removeTaskDetailsHandler = () => {
      setShowTaskDetails(false);
   };

   return (
      <React.Fragment>
         <li
            className={taskClasses}
            onClick={showTaskDetailsHandler}
            style={{animationDelay: props.animationDelay}}
         >
            <h3 className={classes.title}>{props.taskTitle}</h3>
            <div className={classes["subtasks-done"]}>
               {subtasksDone} of {props.subtasks.length} subtasks
            </div>
         </li>
         {showTaskDetails &&
            <TaskDetails
            id={props.id}
            status={props.status}
            onRemove={removeTaskDetailsHandler}
            title={props.taskTitle}
            description={props.description}
            subtasks={props.subtasks}
            subtasksDone={subtasksDone}
         />}
      </React.Fragment>
   );
};

export default Task;
