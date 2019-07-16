const MongoClient = require('mongodb').MongoClient;
const api = require('./DatabaseApi');


exports.startDatabase = (host, port, databaseName, callback) => {
    const client = new MongoClient(`mongodb://${host}:${port}`);
    client.connect(function(err) {
        if(err) {
            callback(err, null);
            return
        }
        const db = client.db(databaseName);
        callback(null, api(db, client))
    });
};