import socketIo from "socket.io";
import app from "../app";

class websocket {

  private io!: socketIo.Server;
  private users: IRoomUser[] = [];
  private messages: IMessage[] = [];
  private userInRoom: any;

  constructor() {
    this.io = app.io;
  }

  public listen(): void {

    this.io.on("connection", (socket) => {

      socket.on("select_room", (data, callback) => {

        socket.join(data.room);

        this.userInRoom = this.users.find((user) =>
          user.username === data.username && 
          user.room === data.room
        );

        if (this.userInRoom) {
          this.userInRoom.socket_id = socket.id;
        } else {
          this.users.push({
            room: data.room,
            username: data.username,
            socket_id: socket.id,
          });
        }

        callback(this.getMessagesRoom(data.room));

      });

      socket.on("message", (data) => {

        const message: IMessage = {
          room: data.room,
          username: data.username,
          text: data.message,
          createdAt: new Date(),
        };

        this.messages.push(message);

        this.io.to(data.room).emit("message", message);

      });
      
    });

  }

  private getMessagesRoom(room: string) {

    return this.messages.filter((message) => message.room === room);

  }

}

export default new websocket;
