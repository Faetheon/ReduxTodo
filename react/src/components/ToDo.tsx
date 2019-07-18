import React, {useState} from 'react';
import styled from 'styled-components';
import { toDoItem } from '../interfaces/toDoItem';

const ToDoContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-flow: row;
`;

const DeleteButton = styled.button`
  color: red;
  margin-left: 15px;
  font-weight: 800;
`;

const ToDoText = styled.div`
  flex-grow: 2;
`;

const ToDoTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 1;
`;

const ToDoContent = styled.div`
  flex-grow: 1;
`;

const CheckBox = styled.input`
  align-self: center;
  margin-right: 15px;
`;

interface ToDoProps {
  attributes: toDoItem,
  deleteItem: Function,
  updateItem: Function
}

const ToDo = (props: ToDoProps) => {
  const {title, content, id} = props.attributes;
  const [is_checked, updateis_checked] = useState<boolean>(props.attributes.is_checked);
  return (
    <ToDoContainer>
      <CheckBox type="checkbox" checked={is_checked} onChange={() => {props.updateItem(props.attributes.id); updateis_checked(!is_checked)}} />
      <ToDoText>
        <ToDoTitle>
          {title.slice(0, 1).toUpperCase() + title.slice(1)}
        </ToDoTitle>
        <ToDoContent>
          {content}
        </ToDoContent>
      </ToDoText>
      <DeleteButton onClick={(() => {props.deleteItem(id)})}>DELETE</DeleteButton>
    </ToDoContainer>
  );
};

export default ToDo;