const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedProducts = require('./seed.js');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
try {
  mongoose.connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log('🔥 Connected to MongoDB')
  );
  seedProducts(); //TODO: when you seed disable the userId of the product model
  console.log('🌱 Products seeded');
} catch (err) {
  console.log(err);
}
