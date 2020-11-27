var http = require('https');

var opt = {
    host: 'kotleni.github.io',
    path: '/lists/wifi_passwords.txt'
};

var callback = function(resp) {
    var str = '';

    resp.on('data', function(chunk) { 
        str += chunk;
    });

    resp.on('end', function() {
        console.log(str);
    });
}

http.request(opt, callback).end();
