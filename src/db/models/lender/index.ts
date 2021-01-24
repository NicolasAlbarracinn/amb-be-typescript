import { Schema, model } from 'mongoose';

import { ILenderDoc } from './types';
import { LenderSchemaFields } from './schema';

const LenderSchema = new Schema(LenderSchemaFields, {
  timestamps: true,
});

const Lender = model<ILenderDoc>('Lender', LenderSchema);

export default Lender;
