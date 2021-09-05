import app from './app1';

let PORT = process.env.PORT || app.PORT;

app.server.listen(PORT, () => {

  console.log("server running");

});
