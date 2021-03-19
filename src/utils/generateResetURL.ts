import { APP_ORIGIN } from '../config';

export const generateResetURL = (plaintextToken: string, userID: string) =>
  `${APP_ORIGIN}/password/reset?id=${userID}&token=${plaintextToken}`;
