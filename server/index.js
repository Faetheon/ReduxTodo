require("dotenv").config();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require("graphql");
const express = require("express");
// // const cors = require("cors");
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
    getTodos: [ToDo]
    createTodo(title: String, content: String, is_checked: Boolean, created_on: String): ToDo
    updateTodo(id: ID!, is_checked: Boolean): Int
    deleteTodo(id: ID!): Int
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
  getTodos: () => {
    return getRows();
  },
  createTodo: (args) => {
    const {title, content, is_checked, created_on} = args;
    async function getId() {
      try {
        client.query(`insert into todos(title, content, is_checked, created_on) values ('${title}', '${content}', ${is_checked}, '${created_on}')`)
          .catch(err => {
            console.error(err);
          });
        const query = await client.query(`select id from todos where created_on='${created_on}'`);
        return query.rows[0].id;
      } catch (err) {
        console.error(err);
      }
    }
    let id = getId();
    return {id, title, content, is_checked, created_on};
  },
  updateTodo: (args) => {
    client.query(`update todos set is_checked=${args.is_checked} where id=${args.id}`)
    .catch(err => {
      console.error(err);
    });
    return args.id;
  },
  deleteTodo: (args) => {
    client.query(`delete from todos where id=${args.id}`)
    .catch(err => {
      console.error(err);
    });
    return args.id;
  },
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
// app.use(cors()); // This isn't needed... Yet
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// app.post("/create_todo", (req, response) => {
//     const {title, content, is_checked, created_on} = req.body.todo;
//     // Query to create a todo in todos table
//   client.query(`insert into todos(title, content, is_checked, created_on) values (${title}, ${content}, ${is_checked}, ${created_on})`)
//     .then(result => {
//       console.log(result)
//       response.send({});
//     })
//     .catch(err => {
//       console.error(err);
//       res.send(500);
//     });
// });

// app.patch("/update_todo", (req, res) => {
//   const {id, is_checked} = req.body.todo;
//   // Query to update todo table at id
//   client.query(`update todos set is_checked=${is_checked} where id=${id}`)
//     .then(res => {
//       res.send(300);
//     })
//     .catch(err => {
//       console.error(err);
//       res.send(500);
//     });
// });

// app.delete("/delete_todo", (req, res) => {
//   const {id} = req.body.todo;
//   // Query to delete from todo table at req.body.id
//   client.query(`delete from todos where id='${id}'`)
//     .then(res => {
//       res.send(302);
//     })
//     .catch(err => {
//       console.error(err);
//       res.send(500);
//     });
// });

// ToDo
// app.patch("/login", (req, res) => {
  
// })

// app.patch("/signup", (req, res) => {
  
// })

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
