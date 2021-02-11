import { IPlan } from './types';

export const PlanSchemaFields: Record<keyof IPlan, any> = {
  plan: {
    type: String,
    required: true,
    unique: true,
  },
  amountGranted: {
    type: Number,
    required: true,
  },
  signatureAmount: {
    type: Number,
    required: true,
  },
  portfolioTypes: {
    type: String,
    enum: ['Sin fines determinados', 'Ayudas economicas', 'Vacaciones'],
    default: 'Sin fines determinados',
    required: true,
  },
  dues: [
    {
      duesQuantity: {
        type: String,
        required: true,
      },
      duesAmount: {
        type: String,
        required: true,
      },
    },
  ],
};
