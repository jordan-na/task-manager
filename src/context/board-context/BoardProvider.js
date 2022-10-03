import { useReducer } from "react";
import Storage from "../../utils/storage";
import BoardContext from "./board-context";
import { createBoard, removeBoard, changeSelectedBoard, changeBoardTitle } from "./helpers/board-helper";
import { addColumn, removeColumns } from "./helpers/column-helper";
import { addTask, removeTask, changeTaskStatus, editTask } from "./helpers/task-helper";
import { toggleFinishSubtask } from "./helpers/subtask-helper";

const boardIdsArray = Storage.getValue("boards");
const selectedBoardId = Storage.getValue("selected-board");

const initialBoardState = {
   boardIds: boardIdsArray || [],
   selectedBoard: Storage.getValue(selectedBoardId),
};

const boardReducer = (state, action) => {
   switch (action.type) {
      case "CREATE_BOARD":
         return createBoard(state, action.val);
      case "REMOVE_BOARD":
         return removeBoard(state);
      case "CHANGE_SELECTED_BOARD":
         return changeSelectedBoard(state, action.val);
      case "CHANGE_BOARD_TITLE":
         return changeBoardTitle(state, action.val);
      case "ADD_COLUMN":
         return addColumn(state, action.val);
      case "REMOVE_COLUMNS":
         return removeColumns(state, action.val);
      case "ADD_TASK":
         return addTask(state, action.val);
      case "REMOVE_TASK":
         return removeTask(state, action.val[0], action.val[1]);
      case "CHANGE_TASK_STATUS":
         return changeTaskStatus(state, action.val[0], action.val[1], action.val[2]);
      case "EDIT_TASK":
         return editTask(state, action.val[0], action.val[1]);
      case "TOGGLE_FINISH_SUBTASK":
         return toggleFinishSubtask(state, action.val[0], action.val[1], action.val[2], action.val[3]);
      default:
         throw new Error("Dispatch for boardReducer has invalid action type");
   }
};

const BoardProvider = (props) => {
   const [{ boardIds, selectedBoard }, dispatchBoardData] = useReducer(boardReducer, initialBoardState);

   const createBoardHandler = (boardTitle) => {
      dispatchBoardData({ type: "CREATE_BOARD", val: boardTitle });
   };

   const removeBoardHandler = () => {
      dispatchBoardData({ type: "REMOVE_BOARD" });
   };

   const changeSelectedBoardHandler = (boardId) => {
      dispatchBoardData({ type: "CHANGE_SELECTED_BOARD", val: boardId });
   };

   const changeBoardTitleHandler = (boardTitle) => {
      dispatchBoardData({ type: "CHANGE_BOARD_TITLE", val: boardTitle });
   };

   const addColumnHandler = (columnData) => {
      dispatchBoardData({ type: "ADD_COLUMN", val: columnData });
   };

   const removeColumnsHandler = (...columnIds) => {
      dispatchBoardData({ type: "REMOVE_COLUMNS", val: columnIds });
   };

   const addTaskHandler = (taskData) => {
      dispatchBoardData({ type: "ADD_TASK", val: taskData });
   };

   const removeTaskHandler = (taskId, taskStatus) => {
      dispatchBoardData({ type: "REMOVE_TASK", val: [taskId, taskStatus] });
   };

   const changeTaskStatusHandler = (taskId, prevTaskStatus, newTaskStatus) => {
      dispatchBoardData({ type: "CHANGE_TASK_STATUS", val: [taskId, prevTaskStatus, newTaskStatus] });
   };

   const editTaskHandler = (taskId, editedTask) => {
      dispatchBoardData({ type: "EDIT_TASK", val: [taskId, editedTask] });
   };

   const toggleFinishSubtaskHandler = (columnId, taskId, subtaskId, isFinished) => {
      dispatchBoardData({type: "TOGGLE_FINISH_SUBTASK", val: [columnId, taskId, subtaskId, isFinished]});
   };

   const boardContext = {
      boardIds: boardIds,
      selectedBoard: selectedBoard,
      createBoard: createBoardHandler,
      removeBoard: removeBoardHandler,
      changeSelectedBoard: changeSelectedBoardHandler,
      changeBoardTitle: changeBoardTitleHandler,
      addColumn: addColumnHandler,
      removeColumns: removeColumnsHandler,
      addTask: addTaskHandler,
      removeTask: removeTaskHandler,
      changeTaskStatus: changeTaskStatusHandler,
      editTask: editTaskHandler,
      toggleFinishSubtask: toggleFinishSubtaskHandler
   };

   return <BoardContext.Provider value={boardContext}>{props.children}</BoardContext.Provider>;
};

export default BoardProvider;
