import builder from 'xmlbuilder';
import convert from 'xml-js';

import { getXmlReqConfig } from './xmlRequestConfig';

export interface IXmlBuilderConfig {
  nombre: string;
  sexo: string;
  documento: string;
}

// eslint-disable-next-line no-unused-vars
type XmlBuilderFunc = (args: IXmlBuilderConfig) => string;

export const xmlBuilder: XmlBuilderFunc = ({ nombre, sexo, documento }) => {
  const indetificador = getXmlReqConfig();

  const xml = builder
    .create('mensage', { version: '1.0', encoding: 'ISO-8859-1' })
    .ele({
      indetificador,
      consulta: {
        integrantes: 1,
        integrante: {
          '@valor': 1,
          nombre: `<![CDATA[${nombre}]]>`,
          sexo,
          documento: `<![CDATA[${documento}]]>`,
        },
      },
    })
    .end({ pretty: true });
  return xml.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

export const converXmlToObject = (xml: string): any => {
  const result = convert.xml2js(xml, { ignoreComment: true, alwaysChildren: true });
  return result;
};
