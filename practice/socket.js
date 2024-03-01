const SocketIO = require('socket.io');

module.exports = (server) => {
    const io = SocketIO(server, {path: "/socket.io"});

    io.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        
        console.log(
            `New Client : ${ip}, socket.id : ${socket.id}`
        );
        

        socket.on("disconnect", () => {
            console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
            clearInterval(socket.interval);
        });

        socket.on("error", (error) => {});

        socket.on("message", (data) => {
            console.log(data);
        });

        socket.interval = setInterval(() => {
            socket.emit("from server", "Message From Server"); // send 대신 emit 사용
        }, 3000);
    })
}