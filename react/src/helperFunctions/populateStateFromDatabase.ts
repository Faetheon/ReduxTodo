import { toDoItem } from "../interfaces/toDoItem";
import { reduxStore } from "../interfaces/reduxStore";

export default function populateStateFromDatabase(populateState: Function) {
  fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: `
    {
      getTodos {
        id
        title
        content
        is_checked
        created_on
      }
    }`
    })
  })
    .then(response => response.json())
    .then(result => {
      result.data.getTodos.forEach((todo: toDoItem) => {
        const defaultState: reduxStore = { toDoList: {} };
        const {id, title, content, is_checked, created_on } = todo;
        defaultState.toDoList[id] = {
          title,
          content,
          is_checked,
          created_on
        };
        populateState(id, title, content, is_checked, created_on);
      });
      setTimeout(populateStateFromDatabase, 500, populateState);
    });
}