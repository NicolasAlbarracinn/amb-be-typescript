import { Schema } from 'mongoose';
import { IPortfolio } from './types';

export const PortfolioSchemaFields: Record<keyof IPortfolio, any> = {
  planId: {
    type: Number,
    default: 1,
  },
  portfolioTypes: {
    type: String,
    enum: ['Sin fines determinados', 'Ayudas economicas', 'Vacaciones'],
    default: 'Sin fines determinados',
    required: true,
  },
  description: {
    type: String,
    maxlength: 20,
  },
  minCapital: {
    type: Number,
    required: true,
  },
  minDues: {
    type: Number,
    required: true,
    min: 0,
  },
  administrativeExpense: {
    type: Number,
    required: true,
  },
  monthlyCashRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  nominalAnulRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  anualCashRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  financialTotal: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  validSince: {
    type: Date,
    required: true,
  },
  validTo: {
    type: Date,
    required: true,
  },
  showsAmountAwarded: {
    type: String,
    enum: ['si', 'no'],
    default: 'no',
    required: true,
  },
  maxCapital: {
    type: Number,
    required: true,
    min: 0,
  },
  maxDues: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
  },
  cancellationExpense: {
    type: Number,
    required: true,
  },
  lender: {
    //va a depender de la lista de fondista-- en db agregar una realcion a lista de fondista
    type: Schema.Types.ObjectId,
    ref: 'Lender',
    required: true,
  },
  bankLiquidation: {
    cutDay: {
      type: Number,
      required: true,
    },
    fixedChargeDebtCommission: {
      type: Number,
      required: true,
    },
    fixedChargeDebtCommissionPercent: {
      type: Number,
      required: true,
    },
    percentCreditTax: {
      type: Number,
      required: true,
    },
    percentBankingExpenses: {
      type: Number,
      required: true,
    },
    typeOfCalculation: {
      type: String,
      enum: ['Por lo enviado', 'Por lo debitado'],
      default: 'no',
      required: true,
    },
  },
  assetsLiquidation: {
    cutDay: {
      type: Number,
      required: true,
    },
    fixedChargeDebtCommission: {
      type: Number,
      required: true,
    },
    fixedChargeDebtCommissionPercent: {
      type: Number,
      required: true,
    },
    percentCreditTax: {
      type: Number,
      required: true,
    },
    percentBankingExpenses: {
      type: Number,
      required: true,
    },
    typeOfCalculation: {
      type: String,
      enum: ['Por lo enviado', 'Por lo debitado'],
      default: 'no',
      required: true,
    },
  },
  plans: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
  ],
};
