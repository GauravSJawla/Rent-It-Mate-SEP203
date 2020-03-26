const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/**
 * This is used to connect db asynchronously
 * it will throw an error if db does not connect
 * and will print mongo db connected if it does.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
