import Storage from "../../../utils/storage";
import { v4 as uuid } from "uuid";

export const addColumn = (state, columnData) => {
   const newColumn = {
      id: uuid(),
      title: columnData.columnName,
      color: columnData.color,
      tasks: []
   }
   const updatedBoard  = {
      ...state.selectedBoard,
      columns: state.selectedBoard.columns.concat(newColumn)
   }
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard }
};

export const removeColumns = (state, columnIds) => {
   const updatedBoard = {
      ...state.selectedBoard,
      columns: state.selectedBoard.columns.filter(column => {
         return !columnIds.includes(column.id);
      })
   }
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard };
};