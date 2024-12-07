const storeData = require("../data/store");
const predict = require("../model/inference");
const { randomUUID } = require("crypto");

const postPrediction = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const predictResult = await predict(model, image);
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    ...predictResult,
    createdAt,
  };

  try {
    await storeData(id, data);
  } catch (error) {
    console.log(error);
  }

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);

  return response;
};

module.exports = postPrediction;
