// clase que va configurar el servidor de express, sockets,etc
const express   = require('express')
const http      = require('http')
const socketio  = require('socket.io')
const path      = require('path')
const Sockets   = require('./socket')
const cors      = require('cors') 
class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        //http Server
        this.server = http.createServer(this.app)
        //configuraciones de sockets
        this.io = socketio(this.server,{
            cors:{
                origins:['http://localhost:8081/']
            }
        })
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname,'../public')))
        this.app.use( cors() );
    }

    configSockets(){
        new Sockets(this.io)
    }

    execute (){
        //inicializar middlewares
        this.middlewares()

        //inicializar sockets
        this.configSockets()

        // inicializar server
        this.server.listen(this.port,()=>{
            console.log('Server Corriendo en puerto :8080 ')
          })
    }
}

module.exports = Server