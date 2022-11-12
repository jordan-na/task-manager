import Storage from "../../../utils/storage";
import { v4 as uuid } from "uuid";

export const createBoard = (state, boardTitle) => {
   const todoColumn = { id: uuid(), title: "todo", color: "#41c0ea", tasks: [] };
   const doingColumn = { id: uuid(), title: "doing", color: "#8470f3", tasks: [] };
   const doneColumn = { id: uuid(), title: "done", color: "#65e7b0", tasks: [] };
   const newBoard = {
      id: uuid(),
      title: boardTitle,
      columns: [todoColumn, doingColumn, doneColumn]
   }
   const newBoardIds = state.boardIds.concat(newBoard.id);
   Storage.setValue("boards", newBoardIds);
   Storage.setValue("selected-board", newBoard.id);
   Storage.setValue(newBoard.id, newBoard);
   return { boardIds: newBoardIds, selectedBoard: newBoard };
}

export const removeBoard = (state) => {
   const newBoardIds = state.boardIds.filter(id => id !== state.selectedBoard.id);
   const newSelectedBoard = newBoardIds.length === 0 ? null : Storage.getValue(newBoardIds[0]);
   Storage.setValue("boards", newBoardIds);
   Storage.removeValue(state.selectedBoard.id);
   if(newSelectedBoard === null) Storage.setValue("selected-board", null);
   else Storage.setValue("selected-board", newSelectedBoard.id);
   return { boardIds: newBoardIds, selectedBoard: newSelectedBoard };
};

export const changeSelectedBoard = (state, boardId) => {
   const newSelectedBoard = Storage.getValue(boardId);
   Storage.setValue("selected-board", newSelectedBoard.id);
   return { boardIds: state.boardIds, selectedBoard: newSelectedBoard }
};

export const changeBoardTitle = (state, boardTitle) => {
   const updatedBoard = {
      ...state.selectedBoard,
      title: boardTitle
   }
   return { boardIds: state.boardIds, selectedBoard: updatedBoard };
};