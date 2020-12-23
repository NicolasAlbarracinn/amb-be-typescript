export interface IXmlVerazConfig {
  userlogon: {
    matriz: string;
    usuario: string;
    password: string;
  };
  medio: string;
  formatoInforme: string;
  reenvio: string;
  producto: string;
  lote: {
    sectorVeraz: string;
    sucursalVeraz: string;
    cliente: string;
    fechaHora: string;
  };
}

export const getXmlReqConfig = (): IXmlVerazConfig => {
  const {
    VERAZ_USUARIO,
    VERAZ_MATRIZ,
    VERAZ_PASSWORD,
    VERAZ_SECTOR,
    VERAZ_SUCURSAL,
    VERAZ_PRODUCTO,
    VERAZ_INFORME,
  } = process.env;

  return {
    userlogon: {
      matriz: `<![CDATA[${VERAZ_MATRIZ}]]>`,
      usuario: `<![CDATA[${VERAZ_USUARIO}]]>`,
      password: `<![CDATA[${VERAZ_PASSWORD}]]>`,
    },
    medio: 'completar medio',
    formatoInforme: VERAZ_INFORME || 'H',
    reenvio: '',
    producto: VERAZ_PRODUCTO || 'RISC:Experto',
    lote: {
      sectorVeraz: VERAZ_SECTOR || '02',
      sucursalVeraz: VERAZ_SUCURSAL || '0',
      cliente: VERAZ_MATRIZ || '',
      fechaHora: 'YYYY-MM-DDTHH:MM:SS.099',
    },
  };
};
