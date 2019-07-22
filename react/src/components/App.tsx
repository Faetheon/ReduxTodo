import React from "react";
import { connect } from "react-redux";

// Imported components
import ToDo from "./ToDo";

// Imported Redux
import { reduxStore } from "../interfaces/reduxStore";
import ACTIONS from "../redux/actions";

// Imported Helper Functions
import populateStateFromDatabase from "../helperFunctions/populateStateFromDatabase";

// Imported typescript interfaces
import { toDoItem } from "../interfaces/toDoItem";
import { appProps } from '../interfaces/App';

// Imported styled components
import {
  Form,
  AppContainer,
  TitleInput,
  ContentInput,
  SubmitButton,
  CheckedTodoContainer,
  UncheckedTodoContainer,
  TitleAndButtonContainer
} from '../styledComponents/App';
// const Form = styled.form`
//   display: flex;
//   flex-flow: column;
//   align-self: center;
//   height: 200px;
//   width: 200px;
// `;

// const AppContainer = styled.div`
//   display: flex;
//   flex-flow: column;
//   align-self: center;
//   align-items: center;
// `;

// const TitleInput = styled.input`
//   flex-grow: 1;
// `;

// const ContentInput = styled.textarea`
//   flex-grow: 23;
//   resize: none;
// `;

// const SubmitButton = styled.input`
//   align-self: center;
//   width: fit-content;
//   height: fit-content;
// `;

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

interface App {
  props: appProps;
  state: {
    title: string;
    content: string;
    checkedTodos: Array<toDoItem>
    uncheckedTodos: Array<toDoItem>
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
      checkedTodos: [],
      uncheckedTodos: []
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

  componentDidMount() {
    const toDoList = this.props.toDoList;
    Object.keys(toDoList).map((toDoKey: string) => (      
      this.state.uncheckedTodos.push(toDoList[toDoKey])
    ))
    Object.keys(toDoList).map((toDoKey: string) => (
      this.state.checkedTodos.push(toDoList[toDoKey])
    ))
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
        <TitleAndButtonContainer>

        </TitleAndButtonContainer>
        <CheckedTodoContainer>
        {Object.keys(this.state.checkedTodos).map((toDoKey: string) => (
            <ToDo
              updateItem={this.props.updateItem.bind(this)}
              deleteItem={this.props.deleteItem.bind(this)}
              attributes={{ ...this.props.toDoList[toDoKey] }}
              key={this.props.toDoList[toDoKey].id}
            />
          ))}          
        </CheckedTodoContainer>
        <UncheckedTodoContainer>
          {Object.keys(this.state.uncheckedTodos).map((toDoKey: string) => (
            <ToDo
              updateItem={this.props.updateItem.bind(this)}
              deleteItem={this.props.deleteItem.bind(this)}
              attributes={{ ...this.props.toDoList[toDoKey] }}
              key={this.props.toDoList[toDoKey].id}
            />
          ))}
        </UncheckedTodoContainer>
      </AppContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
