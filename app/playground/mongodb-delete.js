// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (er, db) => {
    if (er) {
        console.log('Unable to connect to MondoDB server!!');
        return;
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').deleteMany({text: 'Eat sill'})
    // .then(result => console.log(result))
    // .catch(er => console.error(er));

    // db.collection('Todos').deleteOne({text: 'Eat sill'})
    //     .then(result => console.log(result))
    //     .catch(er => console.error(er));

    db.collection('Todos').findOneAndDelete({completed: false})
        .then(result => console.log(result))
        .catch(er => console.error(er));
});