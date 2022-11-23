import express from "express";
import cors from "cors";
import {usersCol} from "./database.js"
//import router from "./routes/index.js"

const server = express();
server.use(express.json());
server.use(cors());
//server.use(router);



const port = 5000

server.listen(port, () => console.log("Server starting at " + port));