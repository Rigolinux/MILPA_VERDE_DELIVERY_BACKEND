/* eslint-disable prettier/prettier */

// here we can define the all  environment  variables
export const EnvConfig = () =>({
  //envirioment: process.env.NODE_ENV || 'dev',
  DBURL: process.env.DBURL,
  port: process.env.PORT || 3000,
  default_limit: process.env.DEFAULT_LIMIT || 5,
  SECRETKEY: process.env.SECRETKEY,
});
