//Types
const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM"
}

//Actions
const createItem = (title: string, content: string, id: number) => ({
  type: Types.CREATE_ITEM,
  payload: {
    title,
    content,
    id
  }
});

const deleteItem = (id: number) => ({
  type: Types.DELETE_ITEM,
  payload: id
});

export default {
  createItem,
  deleteItem,
  Types
};