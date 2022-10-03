import Storage from "../../../utils/storage";

export const toggleFinishSubtask = (state, columnId, taskId, subtaskId, isFinished) => {
   const updatedBoard = state.selectedBoard;
   const columnIndex = updatedBoard.columns.findIndex((column) => column.id === columnId);
   const taskIndex = updatedBoard.columns[columnIndex].tasks.findIndex((task) => task.id === taskId);
   const subtaskIndex = updatedBoard.columns[columnIndex].tasks[taskIndex].subtasks.findIndex(
      (subtask) => subtask.id === subtaskId
   );
   updatedBoard.columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].done = isFinished;
   Storage.setValue(updatedBoard.id, updatedBoard);
   return { boardIds: state.boardIds, selectedBoard: updatedBoard};
};
