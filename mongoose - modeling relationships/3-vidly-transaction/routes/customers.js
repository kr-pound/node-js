const express = require('express');
const router = express.Router();

// Model
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', async(req, res) => {

    const customers = await Customer
        .find()
        .sort('name');

    res.send(customers);
});

router.post('/', async(req, res) => {

    const { error } = validateCustomer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    const result = await customer.save()
    res.send(result);
});

router.put('/:id', async(req, res) => {

    const { error } = validateCustomer(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, { new: true });

    if (!customer)
        return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.delete('/:id', async(req, res) => {

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
        return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.get('/:id', async(req, res) => {

    const customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router;
