import { Document, Types } from 'mongoose';
import { ILenderDoc } from '../lender/types';

export type IDues = Array<{ duesQuantity: string; duesAmount: string }>;

export interface IPlan {
  plan: string;
  amountGranted: string;
  signatureAmount: string;
  portfolioTypes: 'Sin fines determinados' | 'Ayudas economicas' | 'Vacaciones';
  lender: Types.ObjectId | ILenderDoc;
  dues: IDues;
}

export interface IPlanDoc extends IPlan, Document {}
