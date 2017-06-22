// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (er, db) => {
    if (er) {
        console.log('Unable to connect to MondoDB server!!');
        return;
    }

    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('594b7b99d661139d2a9abcda'),
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    })
        .then(result => console.log(result))
        .catch(er => console.error(er));
});