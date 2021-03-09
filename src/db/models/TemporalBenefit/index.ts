//maybe i will need this for the creation of a benefit. but i have to think what is the best approach

import { Schema, model } from 'mongoose';

import { ITemporalBenefitDoc } from './types';
import { TemporalBenefitSchemaFields } from './schema';

const TemporalBenefitSchema = new Schema(TemporalBenefitSchemaFields, {
  timestamps: true,
});

const TemporalBenefit = model<ITemporalBenefitDoc>('TemporalBenefit', TemporalBenefitSchema);

export default TemporalBenefit;
