import { Schema, model, HookNextFunction, ToObjectOptions } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUserDoc, IUserModel } from './types';
import { UserSchemaFields } from './schema';

import { RESET_PASS_EXPIRATION_TIME } from '../../../config';

const UserSchema = new Schema(UserSchemaFields, {
  timestamps: true,
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET || '');
  return token;
};

UserSchema.methods.refreshPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + RESET_PASS_EXPIRATION_TIME;

  return resetToken;
};

UserSchema.statics.findByCredentials = async function (email: string, password: string) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email or password');
    //TODO: add custom error handler
    //throw new AppError('Incorrect email or password', 401);
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect email or password');
    //TODO: add custom error handler
    //throw new AppError('Incorrect email or password', 401);
  }

  return user;
};

//Another possible syntax
// UserSchema.static('findByCredentials', () => {});
//UserSchema.methods('generateAuthToken', () => {});

UserSchema.pre('save', async function (this: IUserDoc, next: HookNextFunction) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, { __v, password, ...rest }, options) => rest,
} as ToObjectOptions);

const User = model<IUserDoc, IUserModel>('User', UserSchema);

export default User;
