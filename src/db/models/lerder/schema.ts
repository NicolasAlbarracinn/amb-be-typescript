import { ILender } from './types';

export const LenderSchemaFields: Record<keyof ILender, any> = {
  name: {
    type: String,
    required: true,
  },
};
