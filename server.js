const express = require("express");
const Socket = require("socket.io");

const app = express();

const server = require("http").createServer(app);

const io = Socket(server,{
    cors: {
        origin:"*",
        methods:["GET","POST"]
    }
})

let PORT = 5000;

server.listen(PORT,() => {
    console.log("listening to port: ",PORT)
})

const users = [];



io.on("connection",(socket)=>{
    console.log("Connected to ",socket.id)

    // socket.on("ping",(data)=>{
    //     console.log(data,": from ping event")
    // })

    // io.sockets.emit("message",{
    //     message:"I love you"
    // })

    socket.on("adduser",(username)=>{
        socket.user = username;
        users.push(username);
        io.sockets.emit("users",users)
    })

    socket.on("message",(message)=>{
        io.sockets.emit("message_client",{
            message,
            user:socket.user
        })
    })
})



