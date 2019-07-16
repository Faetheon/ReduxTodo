import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ToDo from "./ToDo";

import { reduxStore } from "../interfaces/reduxStore";
import ACTIONS from "../redux/actions";

const Form = styled.form`
  display: flex;
  flex-flow: column;
  align-self: center;
  height: 200px;
  width: 200px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-self: center;
  align-items: center;
`;

const TitleInput = styled.input`
  flex-grow: 1;
`;

const ContentInput = styled.textarea`
  flex-grow: 23;
  resize: none;
`;

const SubmitButton = styled.input`
  align-self: center;
  width: fit-content;
  height: fit-content;
`;

const mapStateToProps = (state: reduxStore) => ({
  toDoList: state.toDoList
});

const mapDispatchToProps = (dispatch: Function) => ({
  createItem: (title: string, content: string, id: number, isChecked: boolean, createdOn: Date) =>
    dispatch(ACTIONS.createItem(title, content, id, isChecked, createdOn)),
  deleteItem: (id: number) => dispatch(ACTIONS.deleteItem(id)),
  updateItem: (id: number) => dispatch(ACTIONS.updateItem(id))
});

interface appProps {
  createItem: Function;
  deleteItem: Function;
  updateItem: Function;
  toDoList: any;
}

interface App {
  props: appProps;
  state: {
    title: string;
    content: string;
    i: number
  };
  handleSubmit: Function;
  handleChange: Function;
}

class App extends React.Component {
  constructor(props: appProps) {
    super(props);
    this.state = {
      title: "",
      content: "",
      i: 0
    };

    this.handleSubmit = () => {
      this.props.createItem(
        this.state.title.length ? this.state.title : "ToDo",
        this.state.content,
        this.state.i,
        false,
        new Date()
      );
      this.setState({ title: "", content: "", i: this.state.i + 1});
    };

    this.handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
  }

  render() {
    return (
      <AppContainer>
        <Form
          autoComplete="off"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            this.handleSubmit();
          }}
        >
          <TitleInput
            type="text"
            name="title"
            value={this.state.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.handleChange(event);
            }}
          />
          <ContentInput
            name="content"
            value={this.state.content}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              this.handleChange(event);
            }}
          />
          <SubmitButton type="submit" />
        </Form>
        {Object.keys(this.props.toDoList).map((toDo: string) => (
          <ToDo updateItem={this.props.updateItem.bind(this)} deleteItem={this.props.deleteItem.bind(this)} attributes={{ ...this.props.toDoList[toDo] }} key={this.props.toDoList[toDo].id} />
        ))}
        {
          // console.log(fetch('/graphql', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json',
          //   },
          //   body: JSON.stringify({query: "{ hello {id title content is_checked created_on}}"})
          // })
          //   .then(r => {
          //     const res = r.json();
          //     res.data.hello.forEach
          //   }))
        }
      </AppContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
