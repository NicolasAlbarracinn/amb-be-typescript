import validator from 'validator';
import { IUser } from './types';

export const UserSchemaFields: Record<keyof IUser, any> = {
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Email is invalid',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    //TODO: add proper validation
    // validate: {
    //   validator: (value: string) => value.toLowerCase().includes('password'),
    //   message: 'Password cannot contain "password"',
    // },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  image: {
    base64: String,
    imageFormat: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  role: {
    require: true,
    type: String,
    enum: ['financista', 'vendedores', 'asociado', 'potencialAsociado', 'empleado'],
    default: 'potencialAsociado',
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
};
