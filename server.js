import http from 'node:http';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import{redisPublish,redisSubscribe} from './connection.js'
import { WebSocketServer } from 'ws';
dotenv.config();
const port=process.env.PORT || 3000
const REDIS_CHANNEL='websocket-message'
//We are creating http server and returning index.html 
const httpServer = http.createServer(async(req, res) => {
    const indexFile=await fs.readFile(path.resolve('./index.html'),'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
    });
redisSubscribe.subscribe(REDIS_CHANNEL);
redisSubscribe.on('message',async(channel,data)=>{
    console.log(`redis message ${data}`)
    wsServer.clients.forEach((client)=>{
        client.send(data.toString())
        
    })
})
const wsServer=new WebSocketServer({server:httpServer});
wsServer.on('connection',(websocket)=>{
    console.log(`websocket connection...`)
    websocket.on('message',async(data)=>{
        console.log(`web socket message server `,data.toString())
    //Relay the message to broker i.e redis
    await redisPublish.publish(REDIS_CHANNEL,data.toString());

    })
    //broadcast the message to all the clients
    // wsServer.clients.forEach((client)=>{
    //     client.send(data.toString())
        
    // })
})

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
