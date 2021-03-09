import { Types, Document } from 'mongoose';
import { IUserDoc } from '../user/types';
import { IPartnerDoc } from '../partner/types';
import { IPlanDoc } from '../plan/types';

export interface IPartnerInfo {
  partnerId: string;
  name: string;
  lastName: string;
  admissionDate: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  cuil: string;
  civilState: string;
  status: string;
  email: string;
}

export interface IDistributionInfo {
  repartition: string;
  distributionCode: string;
  dependence: string;
  fileNumber: string;
  fileItem: string;
  paymentType: string;
  recoveryPaymentType: string;
  bankName: string;
  cbu: string;
  bankBranchName: string;
  bankAccountNumber: string;
  programCode: string;
  sequenceNumber: string;
}

export interface IBenefit {
  benefitId: number;
  lotNumber?: string;
  benefitType: string;
  certificateNumber: string;
  applicationDate: string;
  portfolio: string;
  plan: Types.ObjectId | IPlanDoc;
  signatureAmount: string;
  duesQuantity: string;
  duesAmount: string;
  amountGranted: string;
  observations: string;
  benefitStatus: string;
  grantedPeriod: string;
  fileGranted: string;
  statusDate: string;
  paymentMethod: string;
  paymentMethodRecovery: string;
  commercializer: string;
  files?: Record<string, unknown>;
  partner: Types.ObjectId | IPartnerDoc;
  createdBy: Types.ObjectId | IUserDoc;
  modifiedBy: Types.ObjectId | IUserDoc;
}

export interface IBenefitDoc extends IBenefit, Document {}
