import app from "./app";
import websocket from "./websocket";

let PORT = process.env.PORT || app.PORT;

websocket.listen();

app.server.listen(PORT, () => {

  console.log("server running");

});
