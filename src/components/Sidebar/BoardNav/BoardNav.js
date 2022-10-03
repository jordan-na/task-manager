import classes from './BoardNav.module.css';
import BoardNavButton from './BoardNavButton/BoardNavButton';
import NewBoardButton from './NewBoardButton/NewBoardButton';
import ThemeContext from "../../../context/theme-context/theme-context";
import BoardContext from '../../../context/board-context/board-context';
import { useContext } from "react";
import Storage from '../../../utils/storage';
import { useEffect, useRef } from 'react';

const BoardNav = (props) => {

   const themeContext = useContext(ThemeContext);
   const boardContext = useContext(BoardContext);

   let boardNavClasses = `${classes['board-nav']} `;

   if (themeContext.theme === "light") boardNavClasses += `${classes.light}`;
   else if (themeContext.theme === "dark") boardNavClasses += `${classes.dark}`;

   const boards = boardContext.boardIds.map(id => Storage.getValue(id));

   const selectedButton = useRef();

   const navigationButtons = (
      boards.length > 0 &&
      boards.map(board => {
         if(board.id === boardContext.selectedBoard.id) {
            return (
               <BoardNavButton ref={selectedButton} onClick={boardContext.changeSelectedBoard.bind(null, board.id)} key={board.id} selected={true}>
                  {board.title}
               </BoardNavButton>
            )
         }
         return (
            <BoardNavButton onClick={boardContext.changeSelectedBoard.bind(null, board.id)} key={board.id}>
               {board.title}
            </BoardNavButton>
         );
      })
   );

   useEffect(() => {
      if(selectedButton.current) selectedButton.current.scrollIntoView();
   }, [boards.length]);

   return (
      <div className={boardNavClasses}>
         <h2>
            All Boards (<span>{boards ? boards.length : 0}</span>)
         </h2>
         <ul className={classes["navs-list"]}>{navigationButtons}</ul>
         <NewBoardButton onClick={props.onShowNewBoard}>+ Create New Board</NewBoardButton>
      </div>
   );
};

export default BoardNav;