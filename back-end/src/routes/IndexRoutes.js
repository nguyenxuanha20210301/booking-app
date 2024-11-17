const bookingRouter = require('./booking');
const placeRoutes = require('./PlaceRoutes');

function route(app) {
    app.use('/bookings', bookingRouter);
    app.use('/places', placeRoutes);
}

module.exports = route;