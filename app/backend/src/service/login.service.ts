import * as bcrypt from 'bcryptjs';
import ITokens from '../Interfaces/IToken';
import JWT from '../utils/JWT';
import { IUserModel } from '../Interfaces/User/IUserModel';
import { IUser } from '../Interfaces/IUser';
import UserModel from '../models/UserModel';

export default class UserService implements IUserModel {
  private model = new UserModel();
  constructor(
    private jwtService = JWT,
  ) {
  }

  async login(data: IUser): Promise<ITokens | null> {
    const dbData = await this.model.login(data);
    if (dbData && bcrypt.compareSync(data.password, dbData.password)) {
      const payload = {
        email: dbData?.email,
      };
      const token = this.jwtService.sign(payload);
      console.log(token);
      return { token };
    }
    return null;
  }
}
