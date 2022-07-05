const BandList = require("./band-list");


class Sockets{

    constructor(io){
        this.io = io
        this.bandList = new BandList()
        this.socketEvents()
    }

    socketEvents(){
        // On Connection
        this.io.on('connection', (socket) => {
            console.log('cliente Conectado');

            //Emitir al cliente conectado, todas las bandas actuales
            socket.emit('currentBands',this.bandList.getBands())

            // votar por la banda
            socket.on('votar-banda',(id)=>{
                this.bandList.increaseVotes(id)
                this.io.emit('currentBands',this.bandList.getBands())
            })
            socket.on('delete-band', (id)=>{
                this.bandList.deleteBand(id)
                this.io.emit('currentBands',this.bandList.getBands())
            })
            socket.on('change-name',({id,newName})=>{
                this.bandList.changeNames(id,newName)
                this.io.emit('currentBands',this.bandList.getBands())
            })
            socket.on('create-band',({name})=>{
                this.bandList.addBand(name)
                this.io.emit('currentBands',this.bandList.getBands())
            })
            
        });
    }
}

module.exports= Sockets