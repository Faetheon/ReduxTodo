import React from 'react';

interface ToDo {
  title: string,
  content: string,
  id: number

}
interface ToDoProps {
  attributes: ToDo
}

const ToDo = (props: ToDoProps) => {

  return (
    <div>
      {props.attributes.title}
      <div>
        {props.attributes.content}
      </div>
    </div>
  );
};

export default ToDo;