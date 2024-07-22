const express = require('express');
const router = express.Router();

const customers = [
    { id: 1, name: 'John Doe', address: '123 Main St, Cityville', balance: 1000.00 },
    { id: 2, name: 'Jane Smith', address: '456 Elm St, Townsville', balance: 1500.50 },
    { id: 3, name: 'Michael Johnson', address: '789 Oak St, Villageton', balance: 500.25 },
    { id: 4, name: 'Emily Davis', address: '101 Pine St, Hamletville', balance: 3000.75 },
    { id: 5, name: 'David Brown', address: '222 Maple St, Suburbia', balance: 750.20 },
    { id: 6, name: 'Robert Taylor', address: '444 Birch St, Townville', balance: 800.60 },
    { id: 7, name: 'Jennifer Martinez', address: '555 Oak St, Cityville', balance: 2200.30 },
    { id: 8, name: 'William Garcia', address: '666 Pine St, Hamletville', balance: 1750.10 },
    { id: 9, name: 'Mary Hernandez', address: '777 Elm St, Countryside', balance: 900.45 }
];

// GET ALL
// Examle: /api/customers
router.get('/', (req, res) => {
    res.status(200).json(customers);
});

// GET ONE
// Examle: /api/customers/id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('id', id);

    const customer = customers.find(c => c.id === parseInt(id));
    console.log(customer.name);

    res.status(200).json(customer);
})

// POST ONE
router.post('/', (req, res) => {
    // When using .json() middleware, I can treat body as an object
    const { body } = req;
    console.log(body);
    console.log(body.name);

    const newID = customers.length + 1;
    console.log('customers.length:', customers.length);
    console.log('newID:', newID);

    const newCustomer = body;
    newCustomer.id = newID;
    customers.push(newCustomer);

    const idx = customers.findIndex(c => c.id === newID);
    // res.send('Create a customer');
    res.status(201).json({ message: `Customer ${newID} was created -> ${customers[idx].toString()}` });
});

// PUT ONE
router.put('/', (req, res) => {
    // When using .json() middleware, I can treat body as an object
    const customer = req.body;
    console.log(customer);
    console.log(customer.name);

    const idx = customers.findIndex(c => c.id === customer.id);
    customers.splice(idx, 1, customer);

    // res.send('Create a customer');
    res.status(202).json({ message: `Customer ${customer.name} was updated.` });
});

// DELETE ONE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('id', id);

    const idx = customers.findIndex(c => c.id === id);
    customers.slice(idx);

    // res.send('Create a customer');
    res.status(204).json({ message: `Customer ${id} was deleted.` });
});

// Examle: /api/customers/id/transaction/tran_id
router.get('/:id/transaction/:tran_id', (req, res) => {
    const { id, tran_id } = req.params;
    console.log('id', id);
    console.log('tran_id', tran_id);

    res.send({ 'name': `ID ${id}`, tran_id: `Transaction ID: ${tran_id}` });
})

module.exports = router;