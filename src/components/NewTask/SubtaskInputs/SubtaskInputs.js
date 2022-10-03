import classes from "./SubtaskInputs.module.css";
import SubtaskInput from "./SubtaskInput/SubtaskInput";
import ThemeContext from "../../../context/theme-context/theme-context";
import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const placeholders = [
   "e.g. Make Coffee",
   "e.g. Drink coffee & smile",
   "e.g. Make another coffee",
   "e.g. Listen to relaxing music",
   "e.g. Listen to a podcast",
   "e.g. Go on a walk",
   "e.g. Call a friend",
   "e.g. Walk the dog",
];

const SubtaskInputs = (props) => {
   const themeContext = useContext(ThemeContext);

   let theme;

   if (themeContext.theme === "light") {
      theme = classes.light;
   } else if (themeContext.theme === "dark") {
      theme = classes.dark;
   }

   let defaultSubtaskInputsState;

   if(props.defaultSubtaskInputs) {
      defaultSubtaskInputsState = props.defaultSubtaskInputs.map(subtask => {
         return { id: subtask.id, value: subtask.subtask }
      })
   } else {
      defaultSubtaskInputsState = [
         { id: uuid(), placeholder: placeholders[0] },
         { id: uuid(), placeholder: placeholders[1] },
      ];
   }

   const [subtaskInputs, setSubtaskInputs] = useState(defaultSubtaskInputsState);
   const [placeholderIndex, setPlaceHolderIndex] = useState(2);

   const removeSubtaskHandler = (id) => {
      setSubtaskInputs((prevSubtaskInputs) => {
         const newSubtaskInputs = prevSubtaskInputs.filter((s) => s.id !== id);
         for (let i = 0; i < newSubtaskInputs.length; i++) {
            newSubtaskInputs[i].placeholder = placeholders[i];
         }
         return newSubtaskInputs;
      });
      props.onRemoveInput(id);
   };

   const addNewSubtaskHandler = () => {
      setSubtaskInputs((prevSubtaskInputs) => {
         return prevSubtaskInputs.concat({
            id: uuid(),
            placeholder: props.defaultSubtaskInputs ? null : placeholders[placeholderIndex],
         });
      });
   };

   const addSubtaskToFormHandler = (subtask, id) => {
      props.onInputChange({
         id: id,
         subtask: subtask,
         done: false
      });
   };

   let content;

   if (subtaskInputs.length > 0) {
      content = (
         <ul className={classes.subtasks}>
            {subtaskInputs.map((subtaskInput) => {
               return (
                  <SubtaskInput
                     key={subtaskInput.id}
                     id={subtaskInput.id}
                     placeholder={subtaskInput.placeholder}
                     onChange={(evt) => addSubtaskToFormHandler(evt.target.value, subtaskInput.id)}
                     onRemoveSubtask={removeSubtaskHandler}
                     value={subtaskInput.value}
                  />
               );
            })}
         </ul>
      );
   } else {
      content = <span className={classes["no-subtasks"]}>No Subtasks</span>;
   }

   return (
      <div className={theme}>
         <label className={classes.label}>Subtasks</label>
         {content}
         <button type={"button"} className={`${classes.button} ${theme}`} onClick={addNewSubtaskHandler}>
            + Add New Subtask
         </button>
      </div>
   );
};

export default SubtaskInputs;
