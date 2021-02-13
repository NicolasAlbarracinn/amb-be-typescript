import { Types, Document } from 'mongoose';
import { IUserDoc } from '../user/types';

export interface IBenefit {
  benefitId: number;
  lotNumber?: string;
  benefitType: string;
  certificateNumber: string;
  applicationDate: string;
  portfolio: string;
  plan: string;
  signatureAmount: string;
  duesQuantity: string;
  duesAmount: string;
  amountGranted: string;
  observations: string;
  benefitStatus: string;
  grantedPeriod: string;
  fileGranted: string;
  statusDate: string;
  createdBy: Types.ObjectId | IUserDoc;
  modifiedBy: Types.ObjectId | IUserDoc;
}

export interface IBenefitDoc extends IBenefit, Document {}
