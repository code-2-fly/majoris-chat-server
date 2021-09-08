import express from "express";
import http from "http";
import socketIo from "socket.io";

class app {

  public readonly PORT: number = 4000;
  public app!: express.Application;
  public server!: http.Server;
  public io!: socketIo.Server;

  constructor() {
    this.routes();
    this.sockets();
  }

  private routes() {
    this.app = express();
  }

  private sockets(): void {
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server);
  }

}

export default new app;
