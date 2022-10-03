import { useState } from "react";
import classes from "./App.module.css";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import NewBoard from "./components/NewBoard/NewBoard";
import NewTask from "./components/NewTask/NewTask";
import Sidebar from "./components/Sidebar/Sidebar";
import ThemeProvider from "./context/theme-context/ThemeProvider";
import BoardProvider from "./context/board-context/BoardProvider";
import EditBoard from "./components/EditBoard/EditBoard";
import { useEffect } from "react";

function App() {
   const [showNewBoard, setShowNewBoard] = useState(false);
   const [showNewTask, setShowNewTask] = useState(false);
   const [showEditBoard, setEditBoard] = useState(false);
   const [windowDimensions, setWindowDimensions] = useState({
      height: window.innerHeight,
      width: window.innerWidth
   });

   const showNewTaskHandler = () => {
      setShowNewTask(true);
   };

   const removeNewTaskHandler = () => {
      setShowNewTask(false);
   };

   const showNewBoardHandler = () => {
      setShowNewBoard(true);
   };

   const removeNewBoardHandler = () => {
      setShowNewBoard(false);
   };

   const showEditBoardHandler = () => {
      setEditBoard(true);
   };

   const removeEditBoardHandler = () => {
      setEditBoard(false);
   };

   return (
      <BoardProvider>
         <ThemeProvider>
            <div className={classes.app}>
               {showNewBoard && <NewBoard onRemove={removeNewBoardHandler} />}
               {showNewTask && <NewTask onRemove={removeNewTaskHandler} />}
               {showEditBoard && <EditBoard onRemove={removeEditBoardHandler} />}
               <Sidebar onShowNewBoard={showNewBoardHandler} />
               <main>
                  <Header
                     onShowAddNewTask={showNewTaskHandler}
                     onShowNewBoard={showNewBoardHandler}
                     onShowEditBoard={showEditBoardHandler}
                  />
                  <Board />
               </main>
            </div>
         </ThemeProvider>
      </BoardProvider>
   );
}

export default App;
