import { Schema, model } from 'mongoose';

import { IBenefitDoc } from './types';
import { BenefitSchemaFields } from './schema';

const BenefitSchema = new Schema(BenefitSchemaFields, {
  timestamps: true,
});

const Benefit = model<IBenefitDoc>('Benefit', BenefitSchema);

export default Benefit;
