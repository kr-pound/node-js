const express = require('express');
const router = express.Router();

// Transaction
const mongoose = require('mongoose');

// Model
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');

router.get('/', async(req, res) => {

    const rentals = await Rental
        .find()
        .sort('-dateOut');

    res.send(rentals);
});

router.post('/', async(req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { error } = validateRental(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);

        const customer = await Customer.findById(req.body.customerId);
        if (!customer)
            return res.status(400).send('Invalid Customer');

        const movie = await Movie.findById(req.body.movieId);
        if (!movie)
            return res.status(400).send('Invalid Movie');

        if (movie.numberInStock <= 0)
            return res.status(400).send('Out of Stock!');

        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        const result_rental = await rental.save({ session });

        movie.numberInStock--;
        const result_movie = await movie.save({ session });

        // Commit the Transaction
        await session.commitTransaction();
        session.endSession();

        console.log(result_movie);
        res.send(result_rental);

    } catch(e) {

        console.error(e.message);

        // Abort the Transaction
        await session.abortTransaction();
        session.endSession();

        res.status(500).send('Transaction Failed');
    }
});

module.exports = router;
