var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var fs = require('fs');

app.set('views', __dirname + '/client')
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/client'))

server.listen(5000, function () {
  console.log('Server listening at port %d', 5000);
});



app.get('/', function (req, res) {
  res.render('index');
})
app.get('/page2.html', function(req,res) {
    console.log('PAGE@');
    res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/page2.html').pipe(res);
});


io.attach(server);
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'You are connected!');
    //var masc = {};
    // Когда сервер получает сообщение типа “message” от клиента
    socket.on('message', function (message) {
        console.log('A client is speaking to me! They’re saying: ' + message);
        var p = "";
        for(var i = 0; i < message.length; i++){
            if(message[i]!=""){
                p = p + message[i]+'\n';
            }
        }
        fs.writeFile("file1.txt", p, function(error){
            if(error) throw error; // если возникла ошибка
            //console.log("Асинхронная запись файла завершена. Содержимое файла:");
            let data = fs.readFileSync("file1.txt", "utf8");
            //console.log(data);  // выводим считанные данные
        });
        message.sort();
        p = "";
        for(var i = 0; i < message.length; i++){
            if(message[i]!=""){
                let newStr = message[i][0].toUpperCase() + message[i].slice(1).toLowerCase();
                console.log(newStr);
                message[i] = newStr;
                p = p + message[i]+'\n';
            }
        }
        fs.writeFile("file2.txt", p, function(error){
            if(error) throw error; // если возникла ошибка
            //console.log("Асинхронная запись файла завершена. Содержимое файла:");
            let data1 = fs.readFileSync("file2.txt", "utf8");
            //console.log(data1);  // выводим считанные данные
        });
        fs.readFile("file1.txt", function(err, data){
            if (err) {
                console.log(err);
            } else {
                var str = data.toString().split("\n"); // содержимое файла
                socket.emit('file1', str);
            }
        });
    }); 
    socket.on('message1', function (message) {
        fs.readFile("file2.txt", function(err, data){
            if (err) {
                console.log(err);
            } else {
                let masc = data.toString().split("\n"); // содержимое файла
                //console.log("DATA "+ data.toString().split("\n"));
                socket.emit('file2', masc);
            }
        });
    }); 
});

