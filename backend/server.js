const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
