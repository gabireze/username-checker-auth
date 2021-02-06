const mongoose = require('../../database');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    unique: true,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordConfirmation: {
    type: String,
    required: false,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const passwordHash = await bcrypt.hash(this.password, 10);
  this.password = passwordHash;

  if (this.passwordConfirmation) {
    const passwordConfirmationHash = await bcrypt.hash(this.passwordConfirmation, 10);
    this.password = passwordConfirmationHash;
  }

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;