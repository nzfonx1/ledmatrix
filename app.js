var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
// var edajs = require('edajs')

io.set('log level', 1);
app.listen(8500);


function sendbits(socket) {
   socket.emit('news', { hello: 'world' });
}


function handler (req, res) {

  console.log(__dirname + req['url']);
  fs.readFile(__dirname + req['url'],

    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}
var half = 0;
io.sockets.on('connection', function (socket) {
  

  socket.on('pie_morestationdata', function(data){
    var mydata = [['Stazione 0', edajs.GetFloat("STEVANA", "STAZIONI_ST0_REJECT_TOTALI")], ['Stazione 1',  edajs.GetFloat("STEVANA", "STAZIONI_ST1_REJECT_TOTALI")],['Stazione 2',  edajs.GetFloat("STEVANA", "STAZIONI_ST2_REJECT_TOTALI")]]
    socket.volatile.emit('pie_stationdata', mydata)
  });
  
  socket.on('my other event', function (data) {
    
   
    var a = [];
    
    for (i=0;i<25;i++) {
      if (i%2==half) {
        if (Math.floor(Math.random()*2))
          a.push({col: String(i), str: "1101010101011101011101110101011101010101011101011101110101010101" });
        else 
          a.push({col: String(i), str: "0110101111111111111111101010101110111110111011111111111101110111" });
      } 
    }
    half = 1-half
    socket.volatile.emit('news', a);
 

    

  });
});