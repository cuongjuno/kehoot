const connectSocket = () => {
  var http = require("http"),
    socketIO = require("socket.io"),
    port = process.env.PORT || 5000,
    ip = process.env.IP || "127.0.0.1",
    server = http.createServer().listen(port, ip, function () {
      console.log("Socket.IO server started at %s:%s!", ip, port);
    }),
    io = socketIO.listen(server);
  io.set("match origin protocol", true);
  io.set("origins", "*:*");

  io.on("connection", function (socket) {

    socket.on("host-join", (data) => {
      socket.join(data.pin);
    });
    //Player Join Room
    socket.on("player-joined", (data) => {
      socket.join(data);
    });
    //Add player to Quiz Object
    socket.on("player-add", (data) => {
      socket
        .to(`${data.pin}`)
        .emit("room-joined", { name: data.nickName, id: socket.id });
    });



    socket.on("question-over", (data) => {
      socket.to(`${data}`).emit("question-over");
    });
    socket.on("next-question", (data) => {
      socket.to(`${data}`).emit("next-question");
      console.log("next-question");
    });
    socket.on("question-answered", (data) => {
      console.log(data.name + " " + data.answer + " " + data.pin);
      socket
        .to(data.pin)
        .emit("player-answer", { name: data.name, answer: data.answer });
    });

    socket.on("sent-info", (data) => {
      console.log("dapan dung" + data.answeredCorrect)
      io.to(data.id).emit("sent-info", {
        answeredCorrect: data.answeredCorrect,
        score: data.score,
      });
    });
    return io;
  });
};

module.exports = connectSocket;
