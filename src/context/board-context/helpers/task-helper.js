import Storage from "../../../utils/storage";

export const addTask = (state, taskData) => {
   const task = taskData;
   const updatedBoard = state.selectedBoard;
   updatedBoard.columns.find(column => column.id === task.status).tasks.push(task);
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard };
};

export const removeTask = (state, taskId, taskStatus) => {
   const updatedBoard = state.selectedBoard;
   const columnIndex = updatedBoard.columns.findIndex(column => column.id === taskStatus);
   const updatedTasks = updatedBoard.columns[columnIndex].tasks.filter(task => task.id !== taskId);
   updatedBoard.columns[columnIndex].tasks = updatedTasks;
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard};
};

export const changeTaskStatus = (state, taskId, prevTaskStatus, newTaskStatus) => {
   const updatedBoard = state.selectedBoard;
   const columnIndex = updatedBoard.columns.findIndex((column) => column.id === prevTaskStatus);
   const taskToMove = updatedBoard.columns[columnIndex].tasks.find(task => task.id === taskId);
   taskToMove.status = newTaskStatus;
   const updatedTasks = updatedBoard.columns[columnIndex].tasks.filter((task) => task.id !== taskId);
   updatedBoard.columns[columnIndex].tasks = updatedTasks;
   updatedBoard.columns.find((column) => column.id === newTaskStatus).tasks.push(taskToMove);
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard };
};

export const editTask = (state, taskId, editedTask) => {
   const updatedBoard = state.selectedBoard;
   const columnIndex = state.selectedBoard.columns.findIndex(column => column.id === editedTask.status);
   const taskIndex = updatedBoard.columns[columnIndex].tasks.findIndex(task => task.id === taskId);
   updatedBoard.columns[columnIndex].tasks[taskIndex] = editedTask;
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard };
}