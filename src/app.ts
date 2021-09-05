import express from "express";
import * as http from "http";
import * as socketIo from "socket.io";

class App {

  public PORT: number = 4000;
  public app!: express.Application;
  public server!: http.Server;
  private io!: socketIo.Server;

  constructor() {

    this.routes();
    this.sockets();
    this.listen();

  }

  public routes() {

    this.app = express();

  }

  private sockets(): void {

    this.server = http.createServer(this.app);

    this.io = new socketIo.Server(this.server);

  }

  private listen(): void {

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

export default new App;
