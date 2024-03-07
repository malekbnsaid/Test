const express = require("express");
const http = require("http");
const config = require("./config/dbconnection.json");
const mongo = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const{addpartiesocket,getbyidsocket,attackSocket}=require('./controller/partieController')
mongo
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch(() => console.log("database not connected"));

const userRouter = require("./routes/users");
const partieRouter = require("./routes/partie");
const joueur = require("./models/joueur");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/partie", partieRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("msg", "A new user is connected");

  socket.on("partie", (data) => {
    addpartiesocket(data)
    io.emit("partie", data);
  });
  socket.on("attack", async (data) => {
    attackSocket(data)
    joueurinfo= await getbyidsocket(data)
    console.log(joueurinfo)
    if(joueurinfo.j1.sante <=0){

    io.emit("attack", joueurinfo.j1.pseudo);
  }
    if(joueurinfo.j2.sante<=0){

      io.emit("attack", joueurinfo.j2.pseudo);
    }
    
    

  });


  socket.on("aff",async (data) => {
    const dataupdate=await getbyidsocket(data)
    io.emit("aff", dataupdate);
  });

  socket.on("msg", (data) => {
    io.emit("msg", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("disconnect", () => {
    io.emit("msg", "An user is disconnected");
  });
});

server.listen(3000, console.log("server run"));

module.exports = app;
