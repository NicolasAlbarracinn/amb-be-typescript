import { ITemporalBenefit } from './types';
import { BenefitSchemaFields } from '../benefit/schema';

export const TemporalBenefitSchemaFields: Record<keyof ITemporalBenefit, any> = {
  reservedID: {
    type: Number,
    required: true,
    unique: true,
  },
  partnerID: {
    type: Number,
    required: true,
    unique: true,
  },
  benefitData: BenefitSchemaFields,
};
