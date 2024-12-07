const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../model/load');
const InputError = require('../error/Input');
require('dotenv').config();


(async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8080,
        host: "0.0.0.0",
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    })

    const model = await loadModel();

    server.app.model = model;
    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const { response } = request;
 
        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.statusCode)
            return newResponse;
        }
 
        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })

            newResponse.code(response.output.statusCode)

            return newResponse;
        }
 
        return h.continue;
    });


    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();
