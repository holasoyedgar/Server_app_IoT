/**
 * This function handlers the rest success
 * @param {*} res 
 * @param {number} status 
 * @param {Object} response 
 */
let success = (res, status, response) => {    
    return res.status(status).json({
        ok: true,
        response
    });
}

module.exports = {
    success
}