import React from 'react';

import ToDo from './ToDo';

interface App {
  generateToDos: Function,
  handleSubmit: Function
}

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.generateToDos = (title: string, content: string, id: number) => {
      return (
        <ToDo attributes={{title, content, id}} key={id}/>
      );
    }
    this.handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      console.log(event);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => {
            event.preventDefault();
            this.handleSubmit(event)
          }
        }>
          <input type='text' name='title' />
          <input type='text' name='content' />
          <input type='submit' />
        </form>
      </div>
    );
  }
};

export default App;