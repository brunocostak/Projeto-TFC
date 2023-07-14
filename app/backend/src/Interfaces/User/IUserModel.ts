// import { ICRUDModel } from '../ICRUDModel';
import { UserLogin } from '../ILogin';
import ITokens from '../IToken';
import { IUser } from '../IUser';

export type IUserModel = UserLogin<ITokens | IUser>;
