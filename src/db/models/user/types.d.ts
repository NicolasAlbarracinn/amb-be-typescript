/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

type Roles = 'financista' | 'vendedores' | 'asociado' | 'potencialAsociado' | 'empleado' | 'admin';

export interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  completed?: string;
  role: Roles;
  passwordResetToken?: string;
  passwordResetExpires?: string;
}

export interface IUserDoc extends IUser, Document {
  generateAuthToken(): string;
  refreshPasswordToken(): string;
}

export interface IUserModel extends Model<IUserDoc> {
  findByCredentials(email: string, password: string): Promise<IUserDoc>;
}
