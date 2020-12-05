/**
 * This function handlers the rest success
 * @param {*} res 
 * @param {number} status 
 * @param {Object} response 
 */
let success = (res, status, response) => {    
    return res.status(status).json({
        response
    });
}

module.exports = {
    success
}