/**
 * import ACTIONS from './action.ts';
import _ from 'lodash';
import {ReduxStore} from '../ts-interfaces/interfaces.ts';

export const defaultState: ReduxStore = {
  items: [],
  aboutNathan: {
    name: "Nathan",
    age: new Date().getFullYear() - new Date(1999, 3).getFullYear(),
    skills: [
      {
        name: "JavaScript",
        workExp: new Date().getFullYear() - new Date(2018, 6).getFullYear(),
      }
    ]
  }
};

const todoReducer = (state = defaultState, action: any) => {
  switch (action.type) {

    case ACTIONS.Types.CREATE_ITEM: {

      let item = action.payload;
      let newItem = {id: state.items.length + 1, description: item};
      let newState = _.cloneDeep(state);
      newState.items.push(newItem);
      return newState;
    }

    case ACTIONS.Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.items, {id: action.payload});
      newState.items.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
}

export default todoReducer;
 */
import { reduxStore } from '../interfaces/reduxStore';
import ACTIONS from './actions';
import { toDoItem } from '../interfaces/toDoItem';

export const defaultState: reduxStore = {toDoList: {}};

const reducer = (state = defaultState, action: any) => {
  const newState: reduxStore = {toDoList: {}};
  Object.assign(newState.toDoList, state.toDoList);
  switch(action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      const toDo: toDoItem = {
        title: action.payload.title,
        content: action.payload.content,
        id: action.payload.id,
        isChecked: action.payload.isChecked,
        createdOn: action.payload.createdOn
      };
      newState.toDoList[action.payload.id] = toDo;
      return newState;
    }
    case ACTIONS.Types.DELETE_ITEM: {
      delete newState.toDoList[action.payload];
      return newState;
    }
    case ACTIONS.Types.UPDATE_ITEM: {
      newState.toDoList[action.payload].isChecked = !newState.toDoList[action.payload].isChecked;
      return newState;
    }
    default:
      return state;
  }
}

export default reducer;