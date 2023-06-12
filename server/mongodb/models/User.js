import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    trim: true,
  },
});

/* This code is a pre-save hook in the Mongoose schema for the `Vet` model. It is executed before
saving a new `Vet` document to the database. */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

//*This is how you add a method to the schema
/* This code is adding a method called `checkPassword` to the `userSchema` object. This method takes a
parameter `passwordForm` which is the password entered by the user. The method then uses the
`bcrypt.compare()` function to compare the entered password with the hashed password stored in the
database. If the passwords match, the method returns `true`, otherwise it returns `false`. This
method can be used to authenticate a user's password during login. */
userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
