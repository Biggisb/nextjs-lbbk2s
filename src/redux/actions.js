import nanoid from 'nanoid';
export const ADD_TODO = 'ADD_TODO';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_LIST = 'UPDATE_LIST';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';
export const CLEAR_SELECTED = 'CLEAR_SELECTED';
export const UPDATE_SELECT_STATUS = 'UPDATE_SELECT_STATUS';
export const COPY_TASKS = 'COPY_TASKS';

export const addTodo = (task) => {
  return {
    type: ADD_TODO,
    todo: {
      id: nanoid(),
      task,
      complete: false,
    },
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    task: {
      id: nanoid(),
      task,
      selected: false,
    },
  };
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete,
  };
};

export const updateFilter = (filter) => {
  return {
    type: UPDATE_FILTER,
    filter,
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  };
};

export const clearSelected = () => {
  return {
    type: CLEAR_SELECTED,
  };
};

export const updateSelectStatus = (task) => {
  return {
    type: UPDATE_SELECT_STATUS,
    task,
  };
};

export const copyTasks = (task) => {
  return {
    type: COPY_TASKS,
    task: {
      id: nanoid(),
      task,
      selected: false,
    },
  };
};
