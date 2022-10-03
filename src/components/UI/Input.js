import classes from "./Input.module.css";
import ThemeContext from "../../context/theme-context/theme-context";
import { useContext, useState } from "react";
import arrow from '../../assets/arrow.svg';
import { v4 as uuid } from 'uuid';
import { useRef, useEffect } from "react";

const TextInput = (props) => {
   return <input className={`${classes.input} ${props.theme}`} {...props.input}></input>;
};

const TextArea = (props) => {

   const [numCharacters, setNumCharacters] = useState(props.input.defaultValue ? props.input.defaultValue.length : 0);
   const [showNumCharacters, setShowNumCharacters] = useState(false);

   const onChangeHandler = (evt) => {
      props.input.onChange(evt);
      setNumCharacters(evt.target.value.length)
   }

   const showNumCharactersHandler = () => {
      setShowNumCharacters(true);
   }

   const removeNumCharactersHandler = () => {
      setShowNumCharacters(false);
   }

   return (
      <div className={classes["textarea-container"]}>
         <textarea
            className={`${classes.input} ${classes.textarea} ${props.theme}`}
            {...props.input}
            onChange={onChangeHandler}
            onFocus={showNumCharactersHandler}
            onBlur={removeNumCharactersHandler}
         ></textarea>
         {
            showNumCharacters &&
            <div className={classes["character-limit"]}>
               <span>{numCharacters}</span> / <span>{props.input.maxLength}</span>
            </div>
         }
      </div>
   );
};

const Select = (props) => {
   let initialSelectedIndex = 0;
   if(props.selectedOption) {
      initialSelectedIndex = props.options.findIndex(option => {
         return option.title.toLowerCase() === props.selectedOption.toLowerCase();
      });
   }

   const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
   const [showOptions, setShowOptions] = useState(null);

   let optionsAnimation;
   let arrowAnimation;

   if(showOptions === true) {
      optionsAnimation = classes.show;
      arrowAnimation = classes.rotate;
   } else if (showOptions === false) {
      optionsAnimation = classes.hide;
      arrowAnimation = classes['un-rotate'];
   }

   const selectedOption = props.options[selectedIndex].title;
   const unselectedOptions = props.options.filter((option, i) => i !== selectedIndex)

   const optionsRef = useRef();

   const toggleOptions = () => {
      setShowOptions(prev => !prev);
      setTimeout(() => optionsRef.current && optionsRef.current.scrollIntoView({block: "end"}), 50);
   }

   const changeSelected = (evt) => {
      const innerText = evt.currentTarget.innerText;
      let index;
      for(let i = 0; i < props.options.length; i++) {
         if(props.options[i].title.toLowerCase() === innerText.toLowerCase()) {
            index = i;
            break;
         }
      }
      props.input.onChange(props.options[index].id);
      setSelectedIndex(index);
   };

   const useOutsideClickHandler = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
               setShowOptions();
            }
         }
         document.addEventListener("mousedown", handleClickOutside);
         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref]);
   };

   const wrapperRef = useRef();
   useOutsideClickHandler(wrapperRef);

   return (
      <div ref={wrapperRef} id={props.input.id} className={`${classes.input} ${classes.select} ${props.theme}`} onClick={toggleOptions}>
         <span className={classes.selected}>{selectedOption}</span>
         <img className={`${classes.arrow} ${arrowAnimation}`} src={arrow} alt="arrow" />
         <ul ref={optionsRef} className={`${classes.options} ${optionsAnimation}`}>
            {unselectedOptions.map(option => (
               <li key={uuid()}>
                  <button type={"button"} className={classes.option} onClick={changeSelected}>{option.title}</button>
               </li>
            ))}
         </ul>
      </div>
   );
};

const Input = (props) => {
   const themeContext = useContext(ThemeContext);

   let theme;

   if (themeContext.theme === "light") {
      theme = classes.light;
   } else if (themeContext.theme === "dark") {
      theme = classes.dark;
   }

   let input;
   if (props.input.type === "text") {
      input = (
         <TextInput
            theme={theme}
            input={props.input}
         />
      );
   } else if (props.input.type === "textarea") {
      input = (
         <TextArea
            theme={theme}
            input={props.input}
         />
      );
   } else if (props.input.type === "select") {
      input = (
         <Select
            input={props.input}
            options={props.input.options}
            selectedOption={props.input.selectedOption}
            theme={theme}
         />
      )
   } else {
      input = <input className={`${classes.input} ${theme}`} {...props.input} />;
   }

   return (
      <div className={classes["input-container"]}>
         {props.label && (
            <label className={`${classes.label} ${theme}`} htmlFor={props.input.id}>
               {props.label}
               {props.required && <span className={classes.required}>{" (required)"}</span>}
            </label>
         )}
         {input}
         {props.showErrorMessage && (
            <label className={classes["error-mssg"]}>
               {props.errorMessage}
            </label>
         )}
      </div>
   );
};

export default Input;
