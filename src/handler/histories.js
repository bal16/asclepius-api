const getData = require("../data/get");

const gethistories = async (request, h) => {
    const data = await getData(); 
    
    const response = h.response({
        status: "success",
        data
    })
    response.code(200);
    
    return response;
};


module.exports = gethistories;