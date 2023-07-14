import { IUser } from './IUser';

export interface ILogin<T> {
  login(data: IUser): Promise<T | null>;
}

export type UserLogin<T> = ILogin<T>;
