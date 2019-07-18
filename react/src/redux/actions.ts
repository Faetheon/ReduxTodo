//Types
const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  POPULATE_STATE: "POPULATE_STATE",
  UPDATE_ITEM: "UPDATE_ITEM"
}

//Actions
const createItem = (title: string, content: string, is_checked: boolean, created_on: string) => ({
  type: Types.CREATE_ITEM,
  payload: {
    title,
    content,
    is_checked,
    created_on
  }
});

const deleteItem = (id: number) => ({
  type: Types.DELETE_ITEM,
  payload: id
});

const updateItem = (id: number) => ({
  type: Types.UPDATE_ITEM,
  payload: id
});

const populateState = (id: number, title: string, content: string, is_checked: boolean, created_on: string) => ({
  type: Types.POPULATE_STATE,
  payload: {id, title, content, is_checked, created_on}
});

export default {
  createItem,
  deleteItem,
  updateItem,
  populateState,
  Types
};