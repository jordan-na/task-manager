import { SketchPicker } from "react-color";
import classes from './ColorPicker.module.css';
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
   return (
      <div onClick={props.onClick} className={classes.backdrop}>
         {props.children}
      </div>
   );
};

const portalElement = document.querySelector("#overlays");

const ColorPicker = (props) => {
   const removeColorPickerHandler = (evt) => {
      if (evt.target === evt.currentTarget) {
         props.onRemove();
      }
   };

   return (
      <React.Fragment>
         {ReactDOM.createPortal(
            <Backdrop onClick={removeColorPickerHandler}>
               <div className={classes.container}>
                  <SketchPicker
                     color={props.color}
                     onChange={props.onChange}
                  />
               </div>
            </Backdrop>,
            portalElement
         )}
      </React.Fragment>
   );
};

export default ColorPicker;