import classes from './NewColumnButton.module.css';
import NewColumnForm from './NewColumnForm/NewColumnForm';
import ThemeContext from "../../../context/theme-context/theme-context";
import React, { useContext } from "react";
import { useState } from 'react';

const NewColumnButton = (props) => {
   const themeContext = useContext(ThemeContext);

   let newColumnButtonClasses = `${classes['new-column-button']} `;

   if (themeContext.theme === "light") {
      newColumnButtonClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      newColumnButtonClasses += `${classes.dark}`;
   }

   const [showNewColumnForm, setShowNewColumnForm] = useState(false);

   const showNewColumnFormHandler = () => {
      setShowNewColumnForm(true);
   };

   const removeNewColumnFormHandler = () => {
      setShowNewColumnForm(false);
   };

   return (
      <React.Fragment>
         <button className={newColumnButtonClasses} onClick={showNewColumnFormHandler}>+ New Column</button>
         {
            showNewColumnForm &&
            <NewColumnForm
               columnNames={props.columns.map(column => column.title)}
               onRemove={removeNewColumnFormHandler}
            />
         }
      </React.Fragment>
   );
};

export default NewColumnButton;