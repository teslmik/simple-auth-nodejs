import express from 'express';
import mongoose from 'mongoose';
import authRouter from './auth.router.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://teslmik:13422527951@cluster0.lywdewm.mongodb.net/user-auth?retryWrites=true&w=majority'
    );
    
    app.listen(PORT, () => console.log(`server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
}

start();