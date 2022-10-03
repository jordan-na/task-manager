import { useContext, useState } from "react";
import ThemeContext from "../../../../../../context/theme-context/theme-context";
import BoardContext from "../../../../../../context/board-context/board-context";
import classes from "./EditTask.module.css";
import Input from "../../../../../UI/Input";
import SubtaskInputs from "../../../../../NewTask/SubtaskInputs/SubtaskInputs";
import Modal from "../../../../../UI/Modal";

const EditTask = (props) => {

   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let editTaskClasses = `${classes["edit-task"]} `;

   if(themeContext.theme === "light") {
      editTaskClasses += `${classes.light}`;
   } else if(themeContext.theme === "dark") {
      editTaskClasses += `${classes.dark}`;
   }

   const [editedTask, setEditedTask] = useState({
      id: props.id,
      task: props.task,
      description: props.description,
      subtasks: props.subtasks,
      status: props.status
   });

   const [formIsValid, setFormIsValid] = useState(true);

   const updateTaskValueHandler = (evt) => {
      setFormIsValid(evt.target.value.trim().length > 0);
      setEditedTask((editedTask) => {
         return {
            ...editedTask,
            task: evt.target.value
         }
      })
   };

   const updateDescriptionValueHandler = (evt) => {
      setEditedTask((editedTask) => {
         return {
            ...editedTask,
            description: evt.target.value
         }
      })
   };

   const updateSubtasksValueHandler = (subtask) => {
      setEditedTask((editedTask) => {
         const subtasks = editedTask.subtasks;
         const subtaskIndex = subtasks.findIndex((s) => s.id === subtask.id);
         const existingSubtask = subtasks[subtaskIndex];
         let updatedSubtasks;
         if (existingSubtask) {
            const updatedSubtask = {
               ...existingSubtask,
               subtask: subtask.subtask,
            };
            updatedSubtasks = [...subtasks];
            updatedSubtasks[subtaskIndex] = updatedSubtask;
         } else {
            updatedSubtasks = subtasks.concat(subtask);
         }
         return {
            ...editedTask,
            subtasks: updatedSubtasks,
         };
      });
   };

   const removeSubtaskValueHandler = (id) => {
      setEditedTask((editedTask) => {
         const subtasks = editedTask.subtasks;
         const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id);
         return {
            ...editedTask,
            subtasks: updatedSubtasks,
         };
      });
   };

   const updateStatusValueHandler = (status) => {
      setEditedTask((editedTask) => {
         return {
            ...editedTask,
            status: status
         }
      })
   };

   const submitHandler = (evt) => {
      evt.preventDefault();
      if(formIsValid) {
         props.onSubmit(editedTask);
      }
   };

   return (
      <Modal show={props.show} onCloseModal={props.onClose}>
         <form onSubmit={submitHandler} className={editTaskClasses}>
            <h2>Edit Task</h2>
            <div className={classes.inputs}>
               <Input
                  label={"Task"}
                  input={{
                     type: "text",
                     defaultValue: props.task,
                     onChange: updateTaskValueHandler,
                  }}
               />
               <Input
                  label={"Description"}
                  input={{
                     type: "textarea",
                     defaultValue: props.description,
                     onChange: updateDescriptionValueHandler,
                     maxLength: 300,
                  }}
               />
               <SubtaskInputs
                  defaultSubtaskInputs={props.subtasks}
                  onInputChange={updateSubtasksValueHandler}
                  onRemoveInput={removeSubtaskValueHandler}
               />
               <Input
                  label="status"
                  input={{
                     id: "task-details__status",
                     type: "select",
                     options: boardContext.selectedBoard.columns,
                     onChange: updateStatusValueHandler,
                     selectedOption: boardContext.selectedBoard.columns.find((column) => column.id === props.status).title,
                  }}
               />
            </div>
            <button className={`${classes.button} ${formIsValid ? "" : classes.invalid}`}>Okay</button>
         </form>
      </Modal>
   );
};

export default EditTask;