const gethistories = require("../handler/histories");
const postPrediction = require("../handler/prediction");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPrediction,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: gethistories,
  },
];

module.exports = routes;
