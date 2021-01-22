import { Document } from 'mongoose';

export interface IPortfolio {
  portfolioTypes: 'Sin fines determinados' | 'Ayudas economicas' | 'Vacaciones';
  planId: number; //carga automatica al guardar cartera-generado por back
  description: string; //20 caracteres maximo
  minCapital: number;
  minDues: number; //Minimo debe ser 0
  administrativeExpense: number;
  monthlyCashRate: number; // poner una descripcion T.E.M% | Minimo 0 y se expresa en %
  financialTotal: number; //poner descripcion C.F.T% | Minimo 0 y se expresa en %
  validSince: string; // es una fecha
  validTo: string; //fecha
  showsAmountAwarded: 'si' | 'no';
  maxCapital: number; //Minimo debe ser 0
  maxDues: number; // maximo 120;
  cancellationExpense: number;
  lender: '9 de Mayo' | 'SAEM' | 'HUGER' | 'DAP' | 'MEFIN'; //va a depender de la lista de fondista-- en db agregar una realcion a lista de fondista
  bankLiquidation: ILiquidation;
  assetsLiquidation: ILiquidation;
}

interface ILiquidation {
  cutDay: number; //Debe aparecer el número 10 pero con posibilidad de edición
  fixedChargeDebtCommission: number; //Debe aparecer el número 0 pero con posibilidad de edición
  fixedChargeDebtCommissionPercent: number; //Debe aparecer el número 10 pero con posibilidad de edición
  percentCreditTax: number; //Debe aparecer el número 10 pero con posibilidad de edición
  percentBankingExpenses: number; //Debe aparecer el número 0 pero con posibilidad de edición
  typeOfCalculation: 'Por lo enviado' | 'Por lo debitado'; //Debe aparecer Por lo Enviado con posibilidad de edición
}

export interface IPortfolioDoc extends IPortfolio, Document {}
