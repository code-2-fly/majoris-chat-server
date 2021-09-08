import socketIo from "socket.io";
import app from "./app";

class websocket {

  private io!: socketIo.Server; 

  constructor() {
    this.io = app.io;
  }

  public listen(): void {

    this.io.on("connection", (socket: socketIo.Socket) => {
      console.log(`a user connected: ${socket.id}`);

      socket.on("message", function (data: any) {
        console.log(data.cmd);
        socket.broadcast.emit('message', data);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

    });

  }

}

export default new websocket;