var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname+'/index.html')
});

app.get("/status", function(req,res){
    res.send("OK")
});
const port = 1337;

app.listen(port, function(){
    console.log(`Express node js server running on ${port}`)
})
// http.createServer(function(request, response){
//     response.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     response.write(request.url);
//     response.end()
//     console.log("Node server running on port 1337")
// }).listen(1337);