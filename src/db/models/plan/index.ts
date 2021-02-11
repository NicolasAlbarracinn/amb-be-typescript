import { Schema, model } from 'mongoose';

import { IPlanDoc } from './types';
import { PlanSchemaFields } from './schema';

const PlanSchema = new Schema(PlanSchemaFields, {
  timestamps: true,
});

const Plan = model<IPlanDoc>('Plan', PlanSchema);

export default Plan;
