// 1- Insert http module
const http = require('http');

// 2- Create a server
const server = http.createServer((request, response) => {

// 3- Create a default request / response
    response.end('Hello World');
});

// 4- Start the server
const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});