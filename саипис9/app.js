const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
var myModule = require('requirejs');

var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var fs = require('fs');

app.set('views', __dirname + '/mods')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/mods'))

server.listen(8000, function () {
  console.log('Server listening at port %d', 8000);
});

app.get('/', function (req, res) {
  res.render('index');
})
io.attach(server);

io.sockets.on('connection', function (socket) {
    socket.on('message', function (message) {
      mongoClient.connect(function(err, client){
        var array = new Array();
        myModule(["mod2"],function(mod2) {
          var con=0;
          mod2.show(err,client).then((doc) =>{
            array[con]=doc;
            for(var i = 0; i< doc.length; i++){
              if(array[con][i].price<100){
                console.log("Номера заказов, сумма которых не превосходит 100: ");
                console.log(array[con][i].id);
              }
            }
            socket.emit('show', array[con]);
            con++;
          });
        });
      });
    });

    socket.on('write', function (message) {
      mongoClient.connect(function(err, client){
        myModule(["mod1"], function(mod1) {
           mod1.write(err, client, message);
        });
      });
    });  

    socket.on('edit', function (message) {
      mongoClient.connect(function(err, client){
        var arr = message.split(",");
        var array = new Array();
        myModule(["mod2"],function(mod2) {
          //console.log("mod2");
          var con=0;
          mod2.show(err,client).then((doc) =>{
            array[con]=doc;
            for(var i = 0; i< doc.length; i++){
              if(array[con][i].id == arr[4]){
                if(arr[0].trim() == ''){
                  //console.log("arr[0]");
                  arr[0] = array[con][i].id;
                }
                if(arr[1].trim() == ''){
                  arr[1] = array[con][i].name;
                }
                if(arr[2].trim() == ''){
                  //console.log("arr[2]");
                  arr[2] = array[con][i].num;
                }
                if(arr[3].trim() == ''){
                  arr[3] = array[con][i].price;
                }
                //console.log(array[con][i].id);
              }
            }
            con++;
            var str = arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3] + "," + arr[4];
            myModule(["edit_mod"], function(edit_mod) {
              //console.log("edit_mod");
               edit_mod.edit(err, client, str);
            });
          });
          
        });
      });
    });    

    socket.on('delpr', function (message) {
      mongoClient.connect(function(err, client){
        var array = new Array();
        myModule(["mod2"],function(mod2) {
          var con=0;
          mod2.show(err,client).then((doc) =>{
            array[con]=doc;
            for(var i = 0; i< doc.length; i++){
              if(array[con][i].price > parseInt(message, 10)){
                var mes = array[con][i].id;
                //console.log("id" + mes);
                const db = client.db("orderdb");
                db.collection("orders").deleteOne( {id: mes}, function(err, result){
                   // console.log("mes"+mes);
                    client.close();
                });
              }
            }
            con++;
          });
        });
      });
    }); 
    socket.on('del', function (message) {
      mongoClient.connect(function(err, client){
        myModule(["del_mod"], function(del_mod) {
          del_mod.del(err, client, message);
       });
      });
    });
});