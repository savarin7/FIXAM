const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const artisanRoutes = require('./modules/artisan/artisan.routes');
const customerRoutes = require('./modules/customer/customer.routes');
const serviceRoutes = require('./modules/service/service.routes');
const requestRoutes = require('./modules/request/request.routes');
const reviewRoutes = require('./modules/review/review.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const categoryRoutes = require('./modules/category/category.routes');
const notificationRoutes = require('./modules/notification/notification.routes');

const { errorMiddleware } = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artisan', artisanRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handler
app.use(errorMiddleware);

module.exports = app;
