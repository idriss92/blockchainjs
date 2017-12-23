var http = require("http");
http.createServer(function(request, response){
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('hello world');
    response.end()
    console.log("Node ")
}).listen(1337);