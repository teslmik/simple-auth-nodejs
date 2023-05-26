import { Schema, model } from 'mongoose';

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: [{ type: String, ref: 'Role' }]
}, {
  timestamps: true,
});

export default model('User', User);
