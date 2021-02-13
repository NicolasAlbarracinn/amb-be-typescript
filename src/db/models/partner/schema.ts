import { Schema } from 'mongoose';
import { IPartner } from './types';

export const PartnerSchemaFields: Record<keyof IPartner, any> = {
  partnerId: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: 'a',
  },
  personalData: {
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    procedureNumber: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    cuil: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    civilState: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    personalPhone: {
      type: String,
    },
    salary: {
      type: Number,
    },
    netSalary: {
      type: Number,
    },
    socialQuota: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    recoveryPaymentType: {
      type: String,
      required: true,
    },
    otherPerferences: {
      type: String,
      required: false,
    },
  },
  adress: {
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
  workInfo: {
    repartition: {
      type: String,
      required: true,
    },
    fileNumber: {
      type: String,
      required: true,
    },
    fileItem: {
      type: String,
      required: true,
    },
    cbu: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    bankBranchName: {
      type: String,
      required: true,
    },
    bankBranchCode: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};
