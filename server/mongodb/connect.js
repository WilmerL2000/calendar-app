import mongoose from 'mongoose';

const connectDB = (url) => {
  /* Setting the strictQuery to true. */
  mongoose.set('strictQuery', true);

  /* This code is connecting to a MongoDB database using the Mongoose library. It takes a URL as a
    parameter and returns a promise. If the connection is successful, it logs "Mongo connected" to the
    console. If there is an error, it logs the error to the console. */
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongo connected'))
    .catch((err) => console.log(err));
};

export default connectDB;
