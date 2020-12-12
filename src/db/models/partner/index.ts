import { Schema, model } from 'mongoose';

import { IPartnerDoc } from './types';
import { PartnerSchemaFields } from './schema';

const PartnerSchema = new Schema(PartnerSchemaFields, {
  timestamps: true,
});

const Partner = model<IPartnerDoc>('Partner', PartnerSchema);

export default Partner;
