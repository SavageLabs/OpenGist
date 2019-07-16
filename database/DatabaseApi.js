const mongo = require("mongodb");
const sha256 = require("sha256");
const randomstring = require("randomstring");
const close = client => {
  client.close();
};
const flushCollection = (database, name) => {
  return new Promise((resolve, reject) => {
    const collection = database.collection(name);
    collection
      .remove({})
      .then(() => resolve())
      .catch(err => reject(err));
  });
};
const addPaste = (database, language, content) => {
  return new Promise((resolve, reject) => {
    const collection = database.collection("pastes");
    const hashId = sha256(`${randomstring.generate(25)}_tm${Date.now()}`);
    collection
      .insertOne({ language, content, hashId })
      .then(() => {
        resolve(hashId);
      })
      .catch(err => reject(err));
  });
};
const getPaste = (database, hashId) => {
  return new Promise((resolve, reject) => {
    const collection = database.collection("pastes");
    return collection
      .find({ hashId })
      .limit(1)
      .toArray()
      .then(results => {
        if (results.length === 0) {
          reject("not_found");
          return;
        }
        resolve(results[0]);
      });
  });
};
const getIdString = id => {
  return mongo.ObjectID(id);
};
module.exports = (database, client) => {
  return {
    instances: {
      database,
      client
    },
    close: () => close(client),
    addPaste: (language, content) => addPaste(database, language, content),
    getPaste: hashId => getPaste(database, hashId),
    flushCollection: name => flushCollection(database, name),
    getIdString: id => getIdString(id)
  };
};
