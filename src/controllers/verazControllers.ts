/* eslint-disable prefer-const */
import { RequestHandler } from 'express';

import axios from 'axios';

import { xmlBuilder, converXmlToObject } from 'utils/xmlGenerator';

export const veraz: RequestHandler = async (req, res, next) => {
  const { nombre, sexo, documento } = req.body;

  const url = process.env.VERAZ_URL;

  const xml = xmlBuilder({ nombre, sexo, documento });

  try {
    const result = await axios({
      method: 'POST',
      url,
      data: `par_xml=${xml}`,
    });

    const parsedResult = converXmlToObject(result.data);
    res.status(200).status(201).json({
      status: 'success',
      data: parsedResult,
    });
  } catch (err) {
    console.log(err.message);
    res.send(err.message.data);
  }
};
