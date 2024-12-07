const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection('prediction');

  const doc = predictCollection.doc(id);

  return await doc.set(data);
}
 
module.exports = storeData;