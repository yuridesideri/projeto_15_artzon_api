import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);
server.use(express.static('public'));



const port = 5000

server.listen(port, () => console.log("Server starting at " + port));