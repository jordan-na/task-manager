import classes from "./Board.module.css";
import ThemeContext from "../../context/theme-context/theme-context";
import BoardContext from "../../context/board-context/board-context";
import React, { useContext } from "react";
import BoardColumn from "./BoardColumn/BoardColumn";
import NewColumnButton from "./NewColumn/NewColumnButton";

const Board = (props) => {
   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let boardClasses = `${classes.board} `;

   if (themeContext.theme === "light") {
      boardClasses += `${classes.light}`;
   } else if (themeContext.theme === "dark") {
      boardClasses += `${classes.dark}`;
   }

   const columns = boardContext.selectedBoard ? boardContext.selectedBoard.columns : [];

   let content;

   if(boardContext.selectedBoard) {
      content = (
         <React.Fragment>
            {
               columns.map((column, i) => (
                  <BoardColumn id={column.id} key={column.id} title={column.title} color={column.color} tasks={column.tasks} />
               ))
            }
            <NewColumnButton columns={columns} />
         </React.Fragment>
      );
   } else {
      content = <h2 className={classes['empty-mssg']}>You Have No Boards</h2>
   }

   return (
      <section className={boardClasses}>
         {content}
      </section>
   );
};

export default Board;
