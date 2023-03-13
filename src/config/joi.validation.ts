/* eslint-disable prettier/prettier */

import * as Joi from 'joi';

export const envVarsSchema = Joi.object({
  DBURL: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(5),
});
