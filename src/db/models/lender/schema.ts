import { ILender } from './types';

export const LenderSchemaFields: Record<keyof ILender, any> = {
  cuit: {
    type: Number,
    required: true,
  },
  lenderName: {
    type: String,
    required: true,
  },
  personType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cellphone: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  economicActivity: {
    type: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    registrationPeriod: {
      type: String,
      required: true,
    },
  },
  address: {
    streetAdress: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    aptNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  files: {
    type: Object,
  },
};
