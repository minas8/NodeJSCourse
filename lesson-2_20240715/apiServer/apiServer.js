// 1- Insert http module
const http = require('http');
const url = require('url');

// 'customers' - Resource database

const customers = [
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
    { id: 7, name: 'Robert Taylor', address: '444 Birch St, Townville', balance: 800.60 },
    { id: 8, name: 'Jennifer Martinez', address: '555 Oak St, Cityville', balance: 2200.30 },
    { id: 9, name: 'William Garcia', address: '666 Pine St, Hamletville', balance: 1750.10 },
    { id: 10, name: 'Mary Hernandez', address: '777 Elm St, Countryside', balance: 900.45 }
];

// 2- Create a server
const server = http.createServer((request, response) => {
    // API structure
    // -- 'http://localhost:3003/api/v1/customers'
    // /api/v1/customers - GET
    // /api/v1/customers/{id} - GET (ONE)
    // /api/v1/customers - POST --> {body: {name:, address:, ...}}
    // /api/v1/customers/{id} - PUT --> {body: {id:, name:, address:, ...}}
    // /api/v1/customers/{id} - PATCH --> {body: {id:, name:, address:, ...}}
    // /api/v1/customers/{id} - DELETE

    // 1. Break-down URL to components
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname; // --> /api/v1/customers
    const method = request.method; // --> GET

    // 2. Handle specific URI and METHOD request
    // /api/v1/customers - GET (ALL)
    if (pathname === '/api/v1/customers' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });

        // 3. Response .JSON response
        response.end(JSON.stringify(customers));
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('API endpoint not found!');
    }

});

// 4- Start the server
const PORT = 3004
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});