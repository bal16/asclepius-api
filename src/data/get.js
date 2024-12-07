const { Firestore } = require("@google-cloud/firestore");

async function getData() {
  const db = new Firestore();

  const collection = db.collection("predictions");
  const snapshot = await collection.get()
  const data = []

  snapshot.forEach(doc => {
    data.push(doc.data())
  })

  return data;
}

module.exports = getData;
