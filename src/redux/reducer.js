import { createSelector } from 'reselect';

import {
  ADD_TODO,
  ADD_TASK,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED,
  CLEAR_SELECTED,
  UPDATE_SELECT_STATUS,
  COPY_TASKS,
} from './actions.js';

export const VisibilityFilters = {
  SHOW_ALL: 'Alle',
  SHOW_ACTIVE: 'To-Do',
  SHOW_COMPLETED: 'Fertig',
};

const INITIAL_STATE = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL,
  list: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.task],
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.todo.id
            ? { ...action.todo, complete: action.complete }
            : todo
        ),
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.complete),
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        list: state.list.filter((task) => !task.selected),
      };
    case COPY_TASKS:
      return {
        ...state,
        todos: [...state.todos, ...state.list.filter((task) => task.selected)],
      };
    /* 
    case COPY_TASKS:
      state.list.map((task) => {
        if (task.selected)
          return {
            ...state,
            todos: state.list.map(
              (task) => task.selected ?? [state.todos, task]
            ),
          };
      }); 
    */
    case UPDATE_SELECT_STATUS:
      return {
        ...state,
        list: state.list.map((task) =>
          task.id === action.task.id
            ? { ...action.task, selected: !action.task.selected }
            : task
        ),
      };
    default:
      return state;
  }
};

const getTodosSelector = (state) => state.todos;
const getFilterSelector = (state) => state.filter;
const getList = (state) => state.list;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.complete);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.complete);
      default:
        return todos;
    }
  }
);

export const listSelector = createSelector(getList, (list) => {
  return list;
});

export const statsSelector = createSelector(getTodosSelector, (todos) => {
  const completed = todos.filter((todo) => todo.complete).length;
  return {
    completed,
    active: todos.length - completed,
  };
});
