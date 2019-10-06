const MongoClient = require('mongodb').MongoClient;
const api = require('./DatabaseApi');
const isProd = process.env.NODE_ENV === "production";



exports.startDatabase = (host, port, databaseName, callback) => {
    let client;
  if (!isProd) {
    client = new MongoClient(`mongodb://${host}:${port}`);
  } else {
    client = new MongoClient(
      `mongodb://${process.env.db_user}:${process.env.db_password}@${process.env.db_host}:${port}/?authMechanism=DEFAULT&authSource=${databaseName}`
    );
  }
    client.connect(function(err) {
        if(err) {
            callback(err, null);
            return
        }
        const db = client.db(databaseName);
        callback(null, api(db, client))
    });
};