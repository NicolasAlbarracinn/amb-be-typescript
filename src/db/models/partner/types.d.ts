import { Types, Document } from 'mongoose';
import { IUserDoc } from '../user/types';

//add birthDate

interface IPesonalData {
  documentType: string;
  documentNumber: string;
  procedureNumber: string;
  gender: string;
  cuil: string;
  name: string;
  lastName: string;
  country: string;
  birthPlace: string;
  civilState: string;
  email: string;
  phone: string;
  personalPhone: string;
  salary: number;
  netSalary: number;
  socialQuota: string;
  paymentType: string;
  recoveryPaymentType: string;
  otherPerferences: string;
}

interface IAddress {
  streetAdress: string;
  floor: string;
  aptNumber: string;
  department: string;
  location: string;
  province: string;
  postalCode: string;
  observations: string;
}

interface IWorkInfo {
  repartition: string;
  fileNumber: string;
  fileItem: string;
  cbu: string;
  bankName: string;
  bankBranchName: string;
  bankBranchCode: string;
  bankAccountNumber: string;
  observations: string;
}

export interface IPartner {
  partnerId: number;
  status: boolean;
  personalData: IPesonalData;
  adress: IAddress;
  workInfo: IWorkInfo;
  createdBy: Types.ObjectId | IUserDoc;
  modifiedBy: Types.ObjectId | IUserDoc;
}

export interface IPartnerDoc extends IPartner, Document {}
