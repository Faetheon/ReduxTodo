import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ToDo from "./ToDo";

import { reduxStore } from "../interfaces/reduxStore";
import ACTIONS from "../redux/actions";
import populateStateFromDatabase from "../helperFunctions/populateStateFromDatabase";

const Form = styled.form`
  display: flex;
  flex-flow: column;
  align-self: center;
  height: 200px;
  width: 200px;
`;

const AppHeader = styled.h1`
  display: flex;
`;

const AppContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-self: center;
  align-items: center;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-self: center;
  align-items: left;
`;

const TitleInput = styled.input`
  flex-grow: 1;
`;

const ContentInput = styled.textarea`
  flex-grow: 23;
  margin-top: 5px;
  font: 400 13.3333px Arial;
  resize: none;
`;

const SubmitButton = styled.input`
  margin-top: 5px;
  align-self: center;
  width: fit-content;
  height: fit-content;
`;

const mapStateToProps = (state: reduxStore) => ({
  toDoList: state.toDoList
});

const mapDispatchToProps = (dispatch: Function) => ({
  createItem: (
    title: string,
    content: string,
    is_checked: boolean,
    created_on: string
  ) => dispatch(ACTIONS.createItem(title, content, is_checked, created_on)),
  deleteItem: (id: number) => dispatch(ACTIONS.deleteItem(id)),
  updateItem: (id: number) => dispatch(ACTIONS.updateItem(id)),
  populateState: (id: number, title: string, content: string, is_checked: boolean, created_on: string) => dispatch(ACTIONS.populateState(id, title, content, is_checked, created_on))
});

interface appProps {
  createItem: Function;
  deleteItem: Function;
  updateItem: Function;
  populateState: Function
  toDoList: any;
}

interface App {
  props: appProps;
  state: {
    title: string;
    content: string;
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
    };

    this.handleSubmit = () => {
      this.props.createItem(
        this.state.title.length ? this.state.title : "ToDo",
        this.state.content,
        false,
        new Date().toString().slice(0, 24)
      );
      this.setState({ title: "", content: ""});
    };

    this.handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
  }

  componentWillMount() {
    populateStateFromDatabase(this.props.populateState.bind(this));
  }

  render() {
    return (
      <AppContainer>
        <AppHeader>Redux Todo</AppHeader>
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
            placeholder="ToDo title"
            value={this.state.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.handleChange(event);
            }}
          />
          <ContentInput
            name="content"
            placeholder="Stuff ToDo"
            value={this.state.content}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              this.handleChange(event);
            }}
          />
          <SubmitButton type="submit" />
        </Form>
        <TodoContainer>
          {Object.keys(this.props.toDoList).map((toDoKey: string) => (
            <ToDo
              updateItem={this.props.updateItem.bind(this)}
              deleteItem={this.props.deleteItem.bind(this)}
              attributes={{ ...this.props.toDoList[toDoKey] }}
              key={this.props.toDoList[toDoKey].id}
            />
          ))}
        </TodoContainer>
      </AppContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
