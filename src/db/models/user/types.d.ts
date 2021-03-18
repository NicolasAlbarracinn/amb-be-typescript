/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  completed: string;
  role: 'financista' | 'vendedores' | 'asociado' | 'potencialAsociado' | 'empleado';
}

export interface IUserDoc extends IUser, Document {
  generateAuthToken(): string;
}

export interface IUserModel extends Model<IUserDoc> {
  findByCredentials(email: string, password: string): Promise<IUserDoc>;
}
