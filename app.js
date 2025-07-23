const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://ksmaity777:12345@book-store-cluster.lqnljco.mongodb.net/store"
// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI || MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Bookstore API',
    customfavIcon: '/favicon.ico', // if you have one
  }));

// Default
app.get('/', (req, res) => {
  res.status(200).send({message: '📚 Bookstore API is running', success: true});
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
