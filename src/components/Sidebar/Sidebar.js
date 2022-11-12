import classes from "./Sidebar.module.css";
import Logo from "./Logo/Logo";
import BoardNav from "./BoardNav/BoardNav";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import ThemeContext from "../../context/theme-context/theme-context";
import { useContext, useState } from "react";
import Storage from "../../utils/storage";

const sideBarIsHidden = Storage.getValue("hideSideBar");

const Sidebar = (props) => {
   const [sidebarState, setSidebarState] = useState({
      hidden: sideBarIsHidden || false,
      animation: null,
   });

   const themeContext = useContext(ThemeContext);

   let sidebarClasses = `${classes.sidebar} `;

   if (themeContext.theme === "light") {
      sidebarClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      sidebarClasses += `${classes.dark}`;
   }

   const hideSidebarHandler = () => {
      Storage.setValue("hideSideBar", true);
      setSidebarState({ hidden: true, animation: "slide-left" });
   };

   const showSidebarHandler = () => {
      if (sidebarState.hidden) {
         Storage.setValue("hideSideBar", false);
         setSidebarState({ hidden: false, animation: "slide-right" });
      }
   };

   sidebarClasses += `${sidebarState.hidden ? ` ${classes.hide}` : ""}`;
   sidebarClasses += `${sidebarState.animation ? ` ${classes[sidebarState.animation]}` : ""}`;

   return (
      <div className={sidebarClasses}>
         <div>
            <Logo onShowSidebar={showSidebarHandler} hideText={sidebarState.hidden} />
            <BoardNav onShowNewBoard={props.onShowNewBoard} />
         </div>
         <div className={classes["bottom-controls"]}>
            <ThemeToggle />
            <button className={classes["hide-button"]} onClick={hideSidebarHandler}>
               <svg
                  className={classes["hide-icon"]}
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 489.658 489.658"
               >
                  <path
                     d="M485.313,252.34l4.345-7.511l-4.345-7.511c-23.974-41.44-58.446-76.197-99.691-100.511
	c-42.473-25.038-91.117-38.28-140.681-38.3c-0.037,0-0.074-0.001-0.112-0.001s-0.074,0.001-0.112,0.001
	c-36.01,0.014-71.531,7.015-104.556,20.441L27.936,6.723L6.723,27.936L111.407,132.62c-2.476,1.358-4.935,2.751-7.371,4.187
	c-41.245,24.314-75.718,59.07-99.691,100.511L0,244.829l4.345,7.511c23.974,41.44,58.446,76.197,99.691,100.511
	c42.473,25.038,91.117,38.28,140.681,38.3c0.037,0,0.074,0.001,0.112,0.001s0.074-0.001,0.112-0.001
	c36.01-0.014,71.531-7.015,104.556-20.441l112.226,112.226l21.213-21.213L378.251,357.038c2.476-1.358,4.935-2.751,7.371-4.187
	C426.867,328.537,461.34,293.781,485.313,252.34z M454.819,244.829c-22.94,36.587-54.809,66.03-91.791,86.144
	c17.673-24.184,28.124-53.964,28.124-86.144s-10.45-61.96-28.124-86.144C400.01,178.799,431.879,208.242,454.819,244.829z
	 M244.829,361.152c-0.036,0-0.071-0.001-0.107-0.001c-64.092-0.058-116.217-52.217-116.217-116.322
	c0-26.675,9.031-51.276,24.189-70.922l47.815,47.815c-3.621,6.916-5.681,14.773-5.681,23.106c0,27.57,22.43,50,50,50
	c8.333,0,16.19-2.06,23.106-5.681l47.815,47.815c-19.619,15.137-44.181,24.163-70.815,24.187
	C244.9,361.151,244.865,361.152,244.829,361.152z M244.829,128.506c0.036,0,0.071,0.001,0.107,0.001
	c64.092,0.058,116.217,52.217,116.217,116.322c0,26.675-9.031,51.276-24.189,70.922l-47.815-47.815
	c3.621-6.916,5.681-14.773,5.681-23.106c0-27.57-22.43-50-50-50c-8.333,0-16.19,2.06-23.106,5.681l-47.815-47.815
	c19.619-15.137,44.181-24.163,70.815-24.187C244.758,128.507,244.793,128.506,244.829,128.506z M34.839,244.829
	c22.94-36.587,54.809-66.03,91.791-86.144c-17.673,24.184-28.124,53.964-28.124,86.144s10.45,61.96,28.124,86.144
	C89.648,310.859,57.779,281.416,34.839,244.829z"
                  />
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
               </svg>
               <span>Hide Sidebar</span>
            </button>
         </div>
      </div>
   );
};

export default Sidebar;
