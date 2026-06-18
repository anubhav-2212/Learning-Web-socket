import http from 'node:http';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import { WebSocketServer } from 'ws';
dotenv.config();
const port=process.env.PORT || 3000
//We are creating http server and returning index.html 
const httpServer = http.createServer(async(req, res) => {
    const indexFile=await fs.readFile(path.resolve('./index.html'),'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
    });
const wsServer=new WebSocketServer({server:httpServer});
wsServer.on('connection',(websocket)=>{
    console.log(`websocket connection...`)
    websocket.on('message',(data)=>{
        console.log(`web socket message server `,data.toString())
        websocket.send(`pong Hello from Server`)
    
    })
})

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
