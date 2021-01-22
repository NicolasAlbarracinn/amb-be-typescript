import { Document } from 'mongoose';

export interface ILender {
  name: '9 de Mayo' | 'SAEM' | 'HUGER' | 'DAP' | 'MEFIN' | string;
}

export interface ILenderDoc extends ILender, Document {}
