// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (er, db) => {
    if (er) {
        console.log('Unable to connect to MondoDB server');
        return;
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: ObjectID('594b77e5a30c0a10bc13ff39')
    // }).toArray()
    //     .then(docs => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     })
    //     .catch(er => console.log('Unable to fetch todos', er));

    db.collection('Todos').find().count()
        .then(count => {
            console.log(`Todos count: ${count}`);
        })
        .catch(er => console.log('Unable to fetch todos', er));

    // db.close();
});