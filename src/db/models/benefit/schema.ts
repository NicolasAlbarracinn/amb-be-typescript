import { Schema } from 'mongoose';
import { IBenefit } from './types';

export const BenefitSchemaFields: Record<keyof IBenefit, any> = {
  benefitId: {
    type: Number,
    required: true,
    unique: true,
  },
  lotNumber: {
    type: String,
  },
  benefitType: {
    type: String,
    required: true,
  },
  certificateNumber: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
  },
  signatureAmount: {
    type: String,
  },
  duesQuantity: {
    type: String,
  },
  duesAmount: {
    type: String,
  },
  amountGranted: {
    type: String,
  },
  observations: {
    type: String,
  },
  benefitStatus: {
    type: String,
    required: true,
  },
  grantedPeriod: {
    type: String,
    required: true,
  },
  fileGranted: {
    type: String,
  },
  statusDate: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  partnerDetail: {
    partnerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: String,
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    documentNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    cuil: {
      type: String,
      required: true,
    },
    civilState: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  distributionDetail: {
    repartition: {
      type: String,
      required: true,
    },
    distributionCode: {
      type: String,
      required: true,
    },
    dependence: {
      type: String,
      required: true,
    },
    fileNumber: {
      type: String,
      required: true,
    },
    fileItem: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    recoveryPaymentType: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    cbu: {
      type: String,
      required: true,
    },
    bankBranchName: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    programCode: {
      type: String,
    },
    sequenceNumber: {
      type: String,
    },
  },
};
