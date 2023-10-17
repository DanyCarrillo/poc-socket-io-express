import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  //console.log("Connected", client);
  client.emit("test", "mensaje de prueba");
  app.get("/test", (req, res) => {
    console.log("test");
    return res.send("Hola mundo");
  });

  app.post("/emitEvent", (req, res) => {
    console.log("notification-input: ", req.body);
    client.emit("notification-input", req.body);
    return res.send(true);
  });

  client.on("event", (data) => {
    console.log("Event triggered by client");
  });

  client.on("disconnect", () => {
    // console.log("Client disconnected");
  });
});

httpServer.listen(3030);
