import ThemeContext from "../../../../context/theme-context/theme-context";
import { useContext } from "react";
import trashIconLight from "../../../../assets/trash-light.svg";
import trashIconDark from "../../../../assets/trash-dark.svg";
import classes from "./SubtaskInput.module.css";
import Input from "../../../UI/Input";
import { v4 as uiud } from "uuid";

const SubtaskInput = (props) => {
   const themeContext = useContext(ThemeContext);

   let trashIconSrc;

   if (themeContext.theme === "light") {
      trashIconSrc = trashIconLight;
   } else if (themeContext.theme === "dark") {
      trashIconSrc = trashIconDark;
   }

   const inputConfig = {
      id: uiud(),
      type: "text",
      placeholder: props.placeholder,
      onChange: props.onChange,
      defaultValue: props.value
   }

   return (
      <li className={classes["subtask-input"]}>
         <Input input={inputConfig} />
         <button type={"button"} onClick={props.onRemoveSubtask.bind(null, props.id)}>
            <img src={trashIconSrc} alt="x-icon" />
         </button>
      </li>
   );
};

export default SubtaskInput;
