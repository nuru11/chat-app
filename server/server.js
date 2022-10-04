const io = require("socket.io")(3000,{
    cors:{
        origin: ["http://localhost:8080"],
    },
})


io.on("connection", socket => {
  
    socket.on("chat-message", (message, roomValue, nameFromClient) => {
       const nameFromServer = nameFromClient
        if(roomValue === ""){
            socket.broadcast.emit("tt", message, nameFromServer)
        }else{
            socket.to(roomValue).emit("tt", message, nameFromServer)
        }
       // socket.broadcast.emit("tt", message)
    })

    socket.on("join-room", (roomV) => {
        socket.join(roomV)
    })
    
})