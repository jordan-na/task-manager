import Modal from "../../../../UI/Modal";
import classes from "./TaskDetails.module.css";
import Input from "../../../../UI/Input";
import SubtaskChecklist from "./SubtaskChecklist/SubtaskChecklist";
import ThemeContext from "../../../../../context/theme-context/theme-context";
import BoardContext from "../../../../../context/board-context/board-context";
import React, { useContext } from "react";
import KebabMenu from "../../../../UI/KebabMenu";
import { useState } from "react";
import EditTask from "./EditTask/EditTask";

const TaskDetails = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let taskDetailsClasses = `${classes['task-details']} `;

   if (themeContext.theme === "light") {
      taskDetailsClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      taskDetailsClasses += `${classes.dark}`;
   }

   const [editingTask, setEditingTask] = useState();

   const removeTaskHandler = () => {
      boardContext.removeTask(props.id, props.status);
   }

   const showEditTaskHandler = () => {
      setEditingTask(true);
   }

   const removeEditTaskHandler = () => {
      setEditingTask(false);
   }

   const changeTaskStatusHandler = (newStatus) => {
      boardContext.changeTaskStatus(props.id, props.status, newStatus)
   };

   const editTaskHandler = (editedTask) => {
      boardContext.editTask(props.id, editedTask);
      setEditingTask(false);
   };

   return (
      <Modal onCloseModal={props.onRemove}>
         {!editingTask && (
            <div className={taskDetailsClasses}>
               <div className={classes.info}>
                  <h2 className={classes.title}>{props.title}</h2>
                  {props.description.trim().length > 0 &&
                     <p className={classes.description}>{props.description}</p>
                  }
                  <KebabMenu
                     className={classes.kebab}
                     menu={[
                        {
                           name: "Delete Task",
                           onClick: removeTaskHandler,
                        },
                        {
                           name: "Edit Task",
                           onClick: showEditTaskHandler,
                        },
                     ]}
                  />
               </div>
               {props.subtasks.length > 0 && (
                  <SubtaskChecklist
                     columnId={props.status}
                     taskId={props.id}
                     subtasks={props.subtasks}
                     subtasksDone={props.subtasksDone}
                  />
               )}
               <Input
                  label="status"
                  input={{
                     id: "task-details__status",
                     type: "select",
                     options: boardContext.selectedBoard.columns,
                     onChange: changeTaskStatusHandler,
                     selectedOption: boardContext.selectedBoard.columns.find((column) => column.id === props.status)
                        .title,
                  }}
               />
            </div>
         )}
         {editingTask && (
            <EditTask
               show={editingTask}
               id={props.id}
               task={props.title}
               description={props.description}
               status={props.status}
               subtasks={props.subtasks}
               onSubmit={editTaskHandler}
               onClose={removeEditTaskHandler}
            />
         )}
      </Modal>
   );
};

export default TaskDetails;
