import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/User/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(data: IUser): Promise<IUser | null> {
    const { email } = data;
    const dbData = await this.model.findOne({
      where: {
        email,
      },
    });
    return dbData;
  }
}
