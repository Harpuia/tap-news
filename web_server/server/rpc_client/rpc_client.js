var jayson = require('jayson');

var client = jayson.client.http({
    port: 4040,
    hostname: 'localhost'
});

// Test RPC method
function add(a, b, callback){
    //err is connection error, error might be returned by server (if not 200)
    client.request('add', [a, b], function(err, error, response) {
        if (err) throw err;
        console.log(response);
        callback(response);
    })
}

module.exports = {
    add : add
};