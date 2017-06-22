const app = require('express')();
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db');
const {Todo, User} = require('./models');

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

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).json();
    }

    Todo.findById(id)
        .then(todo => {
            if (todo) {
                return res.json(todo)
            }
            res.status(404).json();
        }).catch(er => res.status(400).json());
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = {app};