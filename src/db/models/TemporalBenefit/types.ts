import { Document } from 'mongoose';
import { IBenefitDoc } from '../benefit/types';

export interface ITemporalBenefit {
  reservedID: number;
  partnerID: number;
  benefitData: IBenefitDoc;
}

export interface ITemporalBenefitDoc extends ITemporalBenefit, Document {}
