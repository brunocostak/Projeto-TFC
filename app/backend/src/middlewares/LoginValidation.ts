import { Request, Response, NextFunction } from 'express';

const validationEmailAndPassword = (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;
  const maxLenghtPassword = 6;
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const testEmail = emailRegex.test(email);
  if (!testEmail || password.length < maxLenghtPassword) {
    res.status(400).json({ message: 'Invalid email or password' });
    return;
  }
  next();
};

export default validationEmailAndPassword;
