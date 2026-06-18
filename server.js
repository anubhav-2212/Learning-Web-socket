import http from 'node:http';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
dotenv.config();
const port=process.env.PORT || 3000

const httpServer = http.createServer(async(req, res) => {
    });
const wsServer=new WebSocketServer({server:httpServer});
wsServer.on('connection',(websocket)=>{
    console.log(`websocket connecting`)
    websocket.on('message',(data)=>{
        console.log(`web socket message server `,data.toString())
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
