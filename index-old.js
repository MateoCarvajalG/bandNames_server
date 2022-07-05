//servidor de express
const express = require('express')
const app = express();

//servidor de sockets
const server = require('http').createServer(app);

//configuracion del socket server
const io = require('socket.io')(server);

//desplegar el directorio publico
app.use(express.static(__dirname+'/public'))

//conexion
io.on('connection', (socket) => {
  //entiendase como socket, el cliente que se conecta al server
  console.log(socket.id) // dispositivo conectado al socket server
  //cuando el cliente se conecta, se emite un evento hacia el cliente
//   socket.emit('mensaje-bienvenida', {
//     msg:'bienvenido al server',
//     fecha:new Date()
//   })

  socket.on('mensaje-cliente',(data)=>{
    console.log(data)
  })
  
  socket.on('new-message-to-server',(data)=>{
    /*cuando el servidor reciba el mensaje, emita a todos los clientes */
    // socket.emit('message-from-server',data) // se usa socket cuando se quiere emitir solo al cliente que envio el msj
    io.emit('message-from-server',data) // se usa io cuando se quiere emitir a todos los clientes conectados
    
  })
 });

server.listen(8080,()=>{
  console.log('Server Corriendo en puerto :8080 ')
});