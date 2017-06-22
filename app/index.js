const app = require('express')();
const bodyParser = require('body-parser');

const {mongoose} = require('./db');
const {Todo, User} = require('./models');
// const Todo = require('./models/todo');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    new Todo({
        text: req.body.text
    }).save()
        .then(doc => res.status(200).json(doc))
        .catch(er => res.status(400).json({message: er.message}));
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then(todos => res.json({todos}))
        .catch(er => res.json({message: er.message}));
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = {app};