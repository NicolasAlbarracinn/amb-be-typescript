import { Schema, model } from 'mongoose';

import { IPortfolioDoc } from './types';
import { PortfolioSchemaFields } from './schema';

const PortfolioSchema = new Schema(PortfolioSchemaFields, {
  timestamps: true,
});

const Portfolio = model<IPortfolioDoc>('Portfolio', PortfolioSchema);

export default Portfolio;
