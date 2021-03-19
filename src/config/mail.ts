import { Options } from 'nodemailer/lib/smtp-connection';
import { IN_PROD, APP_HOSTNAME } from './app';

const {
  SMTP_HOST = 'smtp.mailtrap.io',
  SMTP_PORT = 2525,
  SMTP_USERNAME = '31c88ee160d19b',
  SMTP_PASSWORD = 'c32e141ddd3ebd',
} = process.env;

export const SMTP_OPTIONS: Options = {
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: IN_PROD,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
};

export const MAIL_FROM = `noreply@${APP_HOSTNAME}`;
