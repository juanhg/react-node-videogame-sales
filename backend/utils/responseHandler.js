/** ResponseHandler */

exports.sendError = function (response, error) {
    response.status(500).send(error.message);
};

exports.sendData = function (response, data) {
    response.status(200).jsonp(data);
};

exports.handleResponse = function(response, data, error){
    var me = this;
    if (error)
        exports.sendError(response, error);
    exports.sendData(response, data);
};