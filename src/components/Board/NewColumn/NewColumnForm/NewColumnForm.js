import classes from './NewColumnForm.module.css';
import ThemeContext from "../../../../context/theme-context/theme-context";
import BoardContext from '../../../../context/board-context/board-context';
import Input from "../../../UI/Input";
import { useContext } from "react";
import Modal from "../../../UI/Modal";
import { useState } from 'react';
import ColorPicker from './ColorPicker/ColorPicker';

const NewColumnForm = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let newColumnFormClasses = `${classes["new-column-form"]} `;
   let defaultColor;

   if (themeContext.theme === "light") {
      newColumnFormClasses += `${classes.light}`;
      defaultColor = "#000";
   } else if (themeContext.theme === "dark") {
      newColumnFormClasses += `${classes.dark}`;
      defaultColor = "#fff";
   }

   const [formData, setFormData] = useState({
      columnName: "",
      color: defaultColor
   });

   const [formIsValid, setFormIsValid] = useState(false);
   const [showColorPicker, setShowColorPicker] = useState(false);

   const updateColumnNameHandler = (evt) => {
      setFormIsValid(isValidInput(evt.target.value));
      setFormData((formData) => {
         return {
            ...formData,
            columnName: evt.target.value
         }
      })
   }

   const isValidInput = (value) => {
      const isEmpty = value.trim().length === 0;
      const nameIsTaken = props.columnNames.some(columnName => columnName.toLowerCase() === value.toLowerCase());
      return !isEmpty && !nameIsTaken;
   };

   const addNewColumnHandler = (evt) => {
      evt.preventDefault();
      if (formIsValid) {
         props.onRemove();
         // props.onSubmit(formData);
         boardContext.addColumn(formData);
      }
   };

   const toggleColorPickerHandler = () => {
      setShowColorPicker(show => !show);
   };

   const updateColorHandler = (color) => {
      setFormData(formData => {
         return {
            ...formData,
            color: color.hex
         }
      })
   };

   return (
      <Modal onCloseModal={props.onRemove}>
         <form onSubmit={addNewColumnHandler} className={newColumnFormClasses}>
            <h2>Create New Column</h2>
            <Input
               label="Name"
               input={{
                  id: "new-column__name",
                  type: "text",
                  placeholder: "e.g. Todo",
                  onChange: updateColumnNameHandler,
               }}
            />
            <div className={classes["color-input"]}>
               <label className={classes.label}>Color:</label>
               <button
                  className={classes["color-button"]}
                  style={{ backgroundColor: formData.color }}
                  onClick={toggleColorPickerHandler}
                  type="button"
               ></button>
            </div>
            <button  className={`${classes.button} ${formIsValid ? "" : classes.invalid}`}>+ Create</button>
         </form>
         {showColorPicker && (
            <ColorPicker
               onRemove={toggleColorPickerHandler}
               color={formData.color}
               onChange={updateColorHandler}
            />
         )}
      </Modal>
   );
};

export default NewColumnForm;