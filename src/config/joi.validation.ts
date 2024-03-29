/* eslint-disable prettier/prettier */

import * as Joi from 'joi';

export const envVarsSchema = Joi.object({
  DBURL: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(5),
  SECRETKEY: Joi.string().required(),
  Paypal_client_id: Joi.string(),
  Paypal_client_secret: Joi.string(),
  Paypal_url: Joi.string(),
});
