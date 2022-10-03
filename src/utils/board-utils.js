import Storage from "./storage";
import { v4 as uuid } from "uuid";

export const createBoard = (state, action) => {
   const todoColumn = { id: uuid(), title: "todo", color: "#41c0ea", tasks: [] };
   const doingColumn = { id: uuid(), title: "doing", color: "#8470f3", tasks: [] };
   const doneColumn = { id: uuid(), title: "done", color: "#65e7b0", tasks: [] };
   Storage.setValue(todoColumn.id, todoColumn);
   Storage.setValue(doingColumn.id, doingColumn);
   Storage.setValue(doneColumn.id, doneColumn);
   const newBoard = {
      id: uuid(),
      title: action.val,
      columns: [todoColumn.id, doingColumn.id, doneColumn.id],
   };
   const newBoardIds = state.boardIds.concat(newBoard.id);
   Storage.setValue("boards", newBoardIds);
   Storage.setValue("selected-board", newBoard.id);
   Storage.setValue(newBoard.id, newBoard);
   return { boardIds: newBoardIds, selectedBoard: newBoard };
};

export const deleteBoard = (state) => {
   const newBoardIds = state.boardIds.filter((id) => id !== state.selectedBoard.id);
   const newSelectedBoard = newBoardIds.length === 0 ? null : Storage.getValue(newBoardIds[0]);
   Storage.removeValue(state.selectedBoard.id);
   Storage.setValue("boards", newBoardIds);
   deleteAllChildren(state.selectedBoard);
   if (newSelectedBoard === null) Storage.setValue("selected-board", null);
   else Storage.setValue("selected-board", newSelectedBoard.id);
   return { boardIds: newBoardIds, selectedBoard: newSelectedBoard };
};

const deleteAllChildren = (parent) => {
   let children;
   for(const prop in parent) {
      if(Array.isArray(parent[prop])) children = parent[prop];
   }
   if(children.length === 0) return;
   for(const child of children) {
      deleteAllChildren(Storage.getValue(child));
      Storage.removeValue(child);
   }
}

export const changeSelectedBoard = (state, action) => {
   const newSelectedBoard = Storage.getValue(state.boardIds.find((id) => id === action.val));
   Storage.setValue("selected-board", newSelectedBoard.id);
   return { boardIds: state.boardIds, selectedBoard: newSelectedBoard };
};

export const addColumn = (state, action) => {
   const newBoard = state.selectedBoard;
   newBoard.columns.push(action.val);
   Storage.setValue(newBoard.id, newBoard);
   return { boardIds: state.boardIds, selectedBoard: newBoard };
};

export const createTask = (state, action) => {
   const task = action.val;
   const updatedColumn = Storage.getValue(task.status);
   updatedColumn.tasks.push(task.id);
   Storage.setValue(task.status, updatedColumn);
   const newTask = {
      ...task,
      subtasks: task.subtasks.map(subtask => subtask.id)
   }
   Storage.setValue(task.id, newTask);
   task.subtasks.forEach(subtask => Storage.setValue(subtask.id, subtask));
   return { boardIds: state.boardIds, selectedBoard: state.selectedBoard };
}