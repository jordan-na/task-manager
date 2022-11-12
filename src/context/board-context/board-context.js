import React from "react";

const BoardContext = React.createContext({
   boardIds: [],
   selectedBoard: {},
   createBoard: (boardTitle) => {},
   removeBoard: () => {},
   changeSelectedBoard: (boardId) => {},
   changeBoardTitle: (boardTitle) => {},
   addColumn: (columnData) => {},
   removeColumns: (...columnIds) => {},
   addTask: (taskData) => {},
   removeTask: (taskId, taskStatus) => {},
   changeTaskStatus: (taskId, prevTaskStatus, newTaskStatus) => {},
   editTask: (taskId, editedTask) => {},
   toggleFinishSubtask: (columnId, taskId, subtaskId, isFinished) => {}
});

export default BoardContext;
