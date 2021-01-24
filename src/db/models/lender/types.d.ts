import { Document } from 'mongoose';

export interface ILender {
  cuit: number; // puede repertise?
  lenderName: string;
  personType: string;
  name: string;
  lastName: string;
  businessName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  cellphone: number;
  phone: number;
  economicActivity: IEconomicActivity;
  address: IAddress;
}

export interface IEconomicActivity {
  type: string;
  order: string;
  registrationPeriod: string;
}
export interface IAddress {
  streetAdress: string;
  floor: string;
  aptNumber: string;
  department: string;
  location: string;
  province: string;
  postalCode: string;
  observations: string;
}

export interface ILenderDoc extends ILender, Document {}
