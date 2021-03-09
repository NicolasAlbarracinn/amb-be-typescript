import { RequestHandler } from 'express';

export const veraz: RequestHandler = (req, res, next) => {
  const renaperData = {
    personalData: {
      birthPlace: 'argentina',
      birthDate: '10/05/1986',
      age: 35,
      civilState: 's',
      country: 'argentina',
      cuil: 20382781727,
      documentNumber: 38278172,
      documentType: 'dni',
      email: 'nicodare@gmail.com',
      gender: 'm',
      lastName: 'Albarracin',
      name: 'Nicolas',
      netSalary: 11000,
      partnerId: '',
      personalPhone: '1562685678',
      phone: '1562685678',
      procedureNumber: 272339423,
      salary: 160000,
      socialQuota: '6000',
    },
    address: {
      aptNumber: 'C',
      department: 'Villa Urquiza',
      floor: '5to',
      isValid: true,
      location: 'CABA',
      observations: '1562685678',
      postalCode: '1431',
      province: 'Buenos Aires',
      streetAddress: 'Miller 2330',
    },
    workInfo: {},
  };
  res.status(200).status(201).json({
    status: 'success',
    data: renaperData,
  });
};
