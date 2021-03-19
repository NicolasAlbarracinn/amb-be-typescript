import nodemailer, { SendMailOptions } from 'nodemailer';
import { SMTP_OPTIONS, MAIL_FROM } from '../../../config';

export const sendEmail = async (options: SendMailOptions) => {
  const transporter = nodemailer.createTransport(SMTP_OPTIONS);

  await transporter.sendMail({ ...options, from: MAIL_FROM });
};
