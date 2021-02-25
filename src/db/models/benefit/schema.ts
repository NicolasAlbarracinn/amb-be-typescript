import { Schema } from 'mongoose';
import { IBenefit } from './types';

export const BenefitSchemaFields: Record<keyof IBenefit, any> = {
  benefitId: {
    type: Number,
    required: true,
    unique: true,
  },
  lotNumber: {
    type: String,
  },
  benefitType: {
    type: String,
    required: true,
  },
  certificateNumber: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  signatureAmount: {
    type: String,
  },
  duesQuantity: {
    type: String,
  },
  duesAmount: {
    type: String,
  },
  amountGranted: {
    type: String,
  },
  observations: {
    type: String,
  },
  benefitStatus: {
    type: String,
    required: true,
  },
  grantedPeriod: {
    type: String,
    required: true,
  },
  fileGranted: {
    type: String,
  },
  statusDate: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentMethodRecovery: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'Partner',
    required: true,
  },
  files: {
    type: Object,
  },
};
