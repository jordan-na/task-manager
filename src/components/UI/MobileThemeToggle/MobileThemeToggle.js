import classes from "./MobileThemeToggle.module.css";
import ThemeContext from "../../../context/theme-context/theme-context";
import { useContext } from "react";


const MobileThemeToggle = (props) => {
   const themeContext = useContext(ThemeContext);

   let mobileThemeToggleClasses = `${props.className} ${classes["mobile-theme-toggle"]} `

   if(themeContext.theme === "light") {
      mobileThemeToggleClasses += `${classes.light}`;
   } else if(themeContext.theme === "dark") {
      mobileThemeToggleClasses += `${classes.dark}`
   }

   return (
      <div className={mobileThemeToggleClasses}>
         <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enable-background="new 0 0 1000 1000"
         >
            <g>
               <path d="M289.3,501.2c0,118.9,96.4,215.2,215.2,215.2c118.9,0,215.2-96.4,215.2-215.2c0-118.9-96.4-215.2-215.2-215.2C385.7,286,289.3,382.4,289.3,501.2z" />
               <path d="M498.8,177.8L498.8,177.8c-17.4,0-31.6-14.2-31.6-31.6V48.9c0-17.4,14.2-31.6,31.6-31.6l0,0c17.4,0,31.6,14.2,31.6,31.6v97.3C530.4,163.6,516.2,177.8,498.8,177.8z" />
               <path d="M504.5,982.7L504.5,982.7c-17.4,0-31.6-14.2-31.6-31.6v-97.3c0-17.4,14.2-31.6,31.6-31.6l0,0c17.4,0,31.6,14.2,31.6,31.6v97.3C536.2,968.5,521.9,982.7,504.5,982.7z" />
               <path d="M156.3,843.7L156.3,843.7c-12-12.5-11.6-32.7,0.9-44.7l70.2-67.3c12.5-12,32.7-11.6,44.7,0.9l0,0c12,12.5,11.6,32.7-0.9,44.7L201,844.7C188.5,856.7,168.4,856.3,156.3,843.7z" />
               <path d="M728.5,267.4L728.5,267.4c-12-12.5-11.6-32.7,0.9-44.7l70.2-67.3c12.5-12,32.7-11.6,44.7,0.9l0,0c12,12.5,11.6,32.7-0.9,44.7l-70.2,67.3C760.7,280.3,740.6,279.9,728.5,267.4z" />
               <path d="M829.5,497.1L829.5,497.1c0.4-17.4,14.9-31.3,32.3-30.9l97.3,2c17.4,0.4,31.3,14.9,30.9,32.3l0,0c-0.4,17.4-14.9,31.3-32.3,30.9l-97.3-2C843.1,529,829.2,514.5,829.5,497.1z" />
               <path d="M10,497.1L10,497.1c0.4-17.4,14.9-31.3,32.3-30.9l97.3,2c17.4,0.4,31.3,14.9,30.9,32.3l0,0c-0.4,17.4-14.9,31.3-32.3,30.9l-97.3-2C23.6,529,9.6,514.5,10,497.1z" />
               <path d="M152.2,159.1L152.2,159.1c11.4-13.1,31.5-14.5,44.6-3l73.3,63.9c13.1,11.4,14.5,31.5,3,44.6l0,0c-11.4,13.1-31.5,14.5-44.6,3l-73.3-63.9C142.2,192.2,140.8,172.2,152.2,159.1z" />
               <path d="M726,735.4L726,735.4c11.4-13.1,31.5-14.5,44.6-3l73.3,63.9c13.1,11.4,14.5,31.5,3,44.6l0,0c-11.4,13.1-31.5,14.5-44.6,3L729,780C715.9,768.6,714.5,748.5,726,735.4z" />
            </g>
         </svg>
         <button className={classes["toggle-switch"]} onClick={props.onThemeChange.bind(null, themeContext.changeTheme)}>
            <span className={classes.circle}></span>
         </button>
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="256" height="256" viewBox="0 0 256 256">
            <g transform="translate(128 128) scale(0.72 0.72)">
               <g transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
                  <path
                     d="M 87.823 60.7 c -0.463 -0.423 -1.142 -0.506 -1.695 -0.214 c -15.834 8.398 -35.266 2.812 -44.232 -12.718 c -8.966 -15.53 -4.09 -35.149 11.101 -44.665 c 0.531 -0.332 0.796 -0.963 0.661 -1.574 c -0.134 -0.612 -0.638 -1.074 -1.259 -1.153 c -9.843 -1.265 -19.59 0.692 -28.193 5.66 C 13.8 12.041 6.356 21.743 3.246 33.35 S 1.732 57.08 7.741 67.487 c 6.008 10.407 15.709 17.851 27.316 20.961 C 38.933 89.486 42.866 90 46.774 90 c 7.795 0 15.489 -2.044 22.42 -6.046 c 8.601 -4.966 15.171 -12.43 18.997 -21.586 C 88.433 61.79 88.285 61.123 87.823 60.7 z"
                     transform=" matrix(1 0 0 1 0 0) "
                     stroke-linecap="round"
                  />
               </g>
            </g>
         </svg>
      </div>
   );
};

export default MobileThemeToggle;