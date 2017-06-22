const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

require('./db');

const {app} = require('./index');
const {Todo, User} = require('./models/index');

const initialTodos = [
    {text: 'todo-text-1'},
    {text: 'todo-text-2'},
    {text: 'todo-text-3'},
    {text: 'todo-text-4'}
];

beforeEach((done) => {
    Todo.remove({})
        .then(() => Todo.insertMany(initialTodos))
        .then(() => done())
        .catch((er) => done(er));
});

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        const text = `todo-text-${new ObjectID()}`;
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => expect(res.body.text).toBe(text))
            .end((err) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((er) => done(er));
            });

    });

    it('should not create todo when given invalid data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .expect((res) => expect(res.body.text).toBe(undefined))
            .end((err) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(initialTodos.length);
                    done();
                }).catch((er) => done(er));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => expect(res.body.todos.length).toBe(initialTodos.length))
            .end(done);
    });
});