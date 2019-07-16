//Types
const Types = {
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM"
}

//Actions
const createItem = (title: string, content: string, id: number, isChecked: boolean, createdOn: Date) => ({
  type: Types.CREATE_ITEM,
  payload: {
    title,
    content,
    id,
    isChecked,
    createdOn
  }
});

const deleteItem = (id: number) => ({
  type: Types.DELETE_ITEM,
  payload: id
});

const updateItem = (id: number) => ({
  type: Types.UPDATE_ITEM,
  payload: id
})

export default {
  createItem,
  deleteItem,
  updateItem,
  Types
};