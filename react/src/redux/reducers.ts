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

export const defaultState = { toDoList: {} };

const reducer = (state = defaultState, action: any) => {
  const newState: reduxStore = { toDoList: {} };
  Object.assign(newState.toDoList, state.toDoList);
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      const toDo: toDoItem = {
        title: action.payload.title,
        content: action.payload.content,
        is_checked: action.payload.is_checked,
        created_on: action.payload.created_on
      };
      (async function(title: String, content: String, is_checked: Boolean, created_on: string) {
        let response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            "Content-Type":"application/json",
            Accept:"application/json",
          },
          body: JSON.stringify({
            query: `
            {
              createTodo(title: "${title}", content: "${content}", is_checked: ${is_checked}, created_on: "${created_on}") {
                id
              }
            }
            `
          })
        });
        
        let result = await response.json();
        console.log(result, newState);
          toDo.id = result.data.createTodo.id;
          newState.toDoList[toDo.id] = toDo;
        return newState;
      })(toDo.title, toDo.content, toDo.is_checked, toDo.created_on);
      return state;
    }
    case ACTIONS.Types.UPDATE_ITEM: {
      newState.toDoList[action.payload].is_checked = !newState.toDoList[action.payload].is_checked;
      fetch('/graphql', {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          Accept:"application/json",
        },
        body: JSON.stringify({
          query: `
          {
            updateTodo(id: "${action.payload}", is_checked: ${newState.toDoList[action.payload].is_checked})
          }
          `
        })
      })
      .catch(err => {
        console.error(err);
      });
      return newState;
    }
    case ACTIONS.Types.DELETE_ITEM: {
      delete newState.toDoList[action.payload];
      fetch('/graphql', {
        method: 'POST',
        headers: {
          "Content-Type":"application/json",
          Accept:"application/json",
        },
        body: JSON.stringify({
          query: `
          {
            deleteTodo(id: "${action.payload}")
          }
          `
        })
      });
      return newState;
    }
    case ACTIONS.Types.POPULATE_STATE: {
      const {id, title, content, is_checked, created_on} = action.payload;
      newState.toDoList[id] = {id, title, content, is_checked, created_on};
      return newState;
    }
    default:
      return state;
  }
}

export default reducer;