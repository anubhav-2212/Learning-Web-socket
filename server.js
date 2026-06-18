import http from 'node:http';
import dotenv from 'dotenv';
dotenv.config();
const port=process.env.PORT || 3000

const server = http.createServer(async(req, res) => {
    
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
