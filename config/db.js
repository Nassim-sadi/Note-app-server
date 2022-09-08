const mongoose = require('mongoose');
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Mongo Connected ${conn.connection.host}`);
    console.log('connected to db');
    console.error('testing console error');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
