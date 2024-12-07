const tf = require('@tensorflow/tfjs-node');
const InputError = require('../error/Input');
 
async function predictBinary(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
   
    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
    const isCancer = confidenceScore > 50;
    
    const classes = ['Cancer', 'Non-cancer'];
    const suggestions = ['Segera periksa ke dokter!', 'Penyakit kanker tidak terdeteksi.'];
   
    const result = isCancer ? classes[0] : classes[1];
    const suggestion = isCancer ? suggestions[0] : suggestions[1];
   
    return { result, suggestion };
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi')
  }
}
 
module.exports = predictBinary;