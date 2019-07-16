require("dotenv").config();
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require("graphql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const dbUrl = process.env.DB_URL;
const PORT = process.env.PORT || 3000;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const schema = buildSchema(`
  type ToDo {
    id: ID!,
    title: String,
    content: String,
    is_checked: Boolean,
    created_on: String
  }
  type Query {
    hello: [ToDo]
  }
`);
async function getRows() {
  let result;
  try {
    result = await client.query('select * from todos');
  } catch(error) {
    console.error(error);
  }
  return result.rows;
}
const root = {
  hello: () => {
    return getRows();
  },
  test: () => {
    return "Hmmm...";
  }
};

const client = new Client(dbUrl, {
  user: USER,
  password: PASSWORD
});
client.connect();
const app = express();

app.use(express.static(`${__dirname}/../react/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.post("/create_todo", (req, res) => {
  req.body.todos.forEach((todo) => {
    const {title, content, is_checked, created_on} = todo;
    // Query to create a todo in todos table
    client.query(`insert into todos(title, content, is_checked, created_on) values (${title}, ${content}, ${is_checked}, ${created_on})`)
    .then(res => {
      res.send(300);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    })
  });
});

app.patch("/update_todo", (req, res) => {
  const {id, title, content, is_checked, created_on} = req.body.todo;
  // Query to update todo table at id
  res.send(301)
});

app.delete("/delete_todo", (req, res) => {
  // Query to delete from todo table at req.body.id
  req.send(301);
});

// ToDo
// app.patch("/login", (req, res) => {
  
// })

// app.patch("/signup", (req, res) => {
  
// })

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
