import Modal from "../UI/Modal";
import Input from "../UI/Input";
import ThemeContext from "../../context/theme-context/theme-context";
import BoardContext from "../../context/board-context/board-context";
import { useContext, useState } from "react";
import classes from "./NewTask.module.css";
import { v4 as uuid } from "uuid";
import SubtaskInputs from "./SubtaskInputs/SubtaskInputs";

const NewTask = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let newTaskClasses = `${classes["new-task"]} `;
   let errorMssgClasses = `${classes["error-mssg"]} `;

   if (themeContext.theme === "light") {
      newTaskClasses += `${classes.light}`;
      errorMssgClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      newTaskClasses += `${classes.dark}`;
      errorMssgClasses += `${classes.dark}`;
   }

   const columns = boardContext.selectedBoard
      ? boardContext.selectedBoard.columns
      : [];

   const [formIsValid, setFormIsValid] = useState(false);
   const [formData, setFormData] = useState(
      boardContext.selectedBoard
         ? {
              id: uuid(),
              task: "",
              description: "",
              subtasks: [],
              status: columns[0].id,
           }
         : null
   );

   const updateTaskValueHandler = (evt) => {
      setFormIsValid(evt.target.value.trim().length > 0);
      setFormData((formData) => {
         return {
            ...formData,
            task: evt.target.value,
         };
      });
   };

   const updateDescriptionValueHandler = (evt) => {
      setFormData((formData) => {
         return {
            ...formData,
            description: evt.target.value,
         };
      });
   };

   const updateSubtasksValueHandler = (subtask) => {
      setFormData((formData) => {
         const subtasks = formData.subtasks;
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
            ...formData,
            subtasks: updatedSubtasks,
         };
      });
   };

   const removeSubtaskValueHandler = (id) => {
      setFormData((formData) => {
         const subtasks = formData.subtasks;
         const updatedSubtasks = subtasks.filter((subtask) => subtask.id !== id);
         return {
            ...formData,
            subtasks: updatedSubtasks,
         };
      });
   };

   const updateStatusValueHandler = (status) => {
      setFormData((formData) => {
         return {
            ...formData,
            status: status,
         };
      });
   };

   const addNewTaskHandler = (evt) => {
      evt.preventDefault();
      if (formIsValid) {
         boardContext.addTask(formData);
         props.onRemove();
      }
   };

   let content;

   if (boardContext.selectedBoard) {
      content = (
         <form className={newTaskClasses} onSubmit={addNewTaskHandler}>
            <h2 className={classes.title}>Add New Task</h2>
            <div className={classes.inputs}>
               <Input
                  label="task"
                  required={true}
                  input={{
                     id: "new-task__task",
                     type: "text",
                     placeholder: "e.g. Take Coffee Break",
                     onChange: updateTaskValueHandler,
                  }}
               />
               <Input
                  label="description"
                  input={{
                     id: "new-task__description",
                     type: "textarea",
                     placeholder:
                        "e.g. It's always good to take a break. The 15 minute break will recharge the batteries a little.",
                     maxLength: 300,
                     onChange: updateDescriptionValueHandler,
                  }}
               />
               <SubtaskInputs
                  onInputChange={updateSubtasksValueHandler}
                  onRemoveInput={removeSubtaskValueHandler}
               />
               <Input
                  label="status"
                  input={{
                     id: "new-task__status",
                     type: "select",
                     options: columns,
                     onChange: updateStatusValueHandler,
                  }}
               />
            </div>
            <button className={`${classes.button} ${formIsValid ? "" : classes.invalid}`}>+ Create Task</button>
         </form>
      );
   } else {
      content = (
         <div className={errorMssgClasses}>
            <h2>Create a board to add task</h2>
            <button onClick={props.onRemove} className={classes.button}>
               Okay
            </button>
         </div>
      );
   }

   return <Modal onCloseModal={props.onRemove}>{content}</Modal>;
};

export default NewTask;
