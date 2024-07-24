// -- INPORTS --
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { user: user });
});

router.get('/transfer', (req, res) => {
    res.render('transfer', { user: user });
});

router.post('/transfer', async (req, res) => {
    const fromAccount = user.accounts.find(account => account.number === req.body.fromAccount);
    const toAccount = user.accounts.find(account => account.number === req.body.toAccount);
    const amount = parseFloat(req.body.amount);

    if (fromAccount && toAccount && fromAccount !== toAccount && amount > 0 && fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        // -- NEW, using MongoDB --
        try {
            const transaction = new Transaction({
                amount: amount,
                fromAccount: fromAccount.number,
                toAccount: toAccount.number
            });

            await transaction.save();
            res.redirect('/');
        } catch (err) {
            console.log(`DB Error: ${err.message}`);
            res.redirect('/');
        };

        // -- OLD, using Array --
        // transactions.push({
        //     date: new Date().toLocaleString(),
        //     amount: amount,
        //     from: fromAccount.number,
        //     to: toAccount.number
        // });
    }

    res.redirect('/');
});

router.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find();

    res.render('transactions', { transactions: transactions });
});

router.get('/add-account', async (req, res) => {
    const accounts = await Account.find();

    res.render('add-account', { accounts: accounts });
});

router.post('/add-account', async (req, res) => {
    const accountNumber = parseFloat(req.body.accountNumber);

    if (accountNumber) {

        // -- NEW, using MongoDB --
        try {
            const account = new Account({
                accountNumber: accountNumber,
                balance: balance
            });

            await account.save();
            res.redirect('/');
        } catch (err) {
            console.log(`DB Error: ${err.message}`);
            res.redirect('/');
        };
    }

    res.redirect('/');
});

module.exports = router;