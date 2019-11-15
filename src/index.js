// ENCARGADO DE LLER LA LECTURA DEL ARDUINO
const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const hbs = require('hbs');
// app es el servidor
const app = express();
// require('./hbs/helpers');
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
//hbs.registerPartials(__dirname + '/views/parciales');
//hbs.registerPartials(__dirname + '/views/parciales');
hbs.registerPartials(path.join(__dirname, "../", "/views/parciales"));
//app.use(express.static(path.join(__dirname, "../", "/public")))
//const router = express.Router();
app.set('port', port);
// iniciar servicio
//app.listen(port, () => {
//  console.log('Escuchando puerto');
//});
// aqui sera enviado todos los clientes

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home', {
        anio: new Date().getFullYear()
    });

});
app.get('/about', (req, res) => {
    res.render('about', {
        anio: new Date().getFullYear()
    });

});
app.get('/services', (req, res) => {
    res.render('services', {
        anio: new Date().getFullYear()
    });

});
//const server = http.createServer(app);

const server = app.listen(app.get('port'), () => {
    console.log('server listening on port: ', 3000);
});

const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('Nueva cioneccion sokec id: ', socket.id);
    socket.on('disconnect', (socket) => {
        console.log('el socket se ha desconectado', socket.id);

    })

    socket.on('connection', (data) => {
        console.log(data);
    })
    socket.on('atime', (data) => {
        console.log(data);
    });

    socket.on('JSON', (data) => {
        console.log(data);
        io.emit('data', data);
    })
});