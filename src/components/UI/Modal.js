import classes from "./Modal.module.css";
import React from "react";
import ReactDOM from "react-dom";
import ThemeContext from "../../context/theme-context/theme-context";
import { useContext } from "react";
import closeIconLight from "../../assets/x-light.svg";
import closeIconDark from "../../assets/x-dark.svg";

const Backdrop = (props) => {
   return <div onClick={props.onClick} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
   const themeContext = useContext(ThemeContext);

   let modalClasses = `${classes.modal} `;
   let closeIconSrc;

   if (themeContext.theme === "light") {
      modalClasses += `${classes.light}`;
      closeIconSrc = closeIconLight;
   }
   else if (themeContext.theme === "dark") {
      modalClasses += `${classes.dark}`;
      closeIconSrc = closeIconDark;
   }

   if (props.show === true) modalClasses += ` ${classes["slide-in"]}`;
   else if (props.show === false) modalClasses += ` ${classes["slide-out"]}`;

   return (
      <div className={modalClasses}>
         {props.children}
         <button className={classes["close-button"]} onClick={props.onClose}>
            <img src={closeIconSrc} alt="close icon" />
         </button>
      </div>
   );
};

const portalElement = document.querySelector("#overlays");

const Modal = (props) => {

   return (
      <React.Fragment>
         {ReactDOM.createPortal(<Backdrop onClick={props.onCloseModal} />, portalElement)}
         {ReactDOM.createPortal(<ModalOverlay onClose={props.onCloseModal}>{props.children}</ModalOverlay>, portalElement)}
      </React.Fragment>
   );
};

export default Modal;
