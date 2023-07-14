import * as bcrypt from 'bcryptjs';

const encrypt = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default encrypt;
