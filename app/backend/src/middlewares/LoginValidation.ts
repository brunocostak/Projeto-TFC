import { Request, Response, NextFunction } from 'express';

const validationEmailAndPassword = (req:Request, res:Response, next:NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'All fields must be filled' });
    return;
  }
  const maxLenghtPassword = 6;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const testEmail = emailRegex.test(email);
  console.log(testEmail);
  if (!testEmail || password.length < maxLenghtPassword) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }
  next();
};

export default validationEmailAndPassword;
