/* eslint-disable prettier/prettier */

// here we can define the all  environment  variables
export const EnvConfig = () =>({
  //envirioment: process.env.NODE_ENV || 'dev',
  DBURL: process.env.DBURL,
  port: process.env.PORT || 3000,
  port2: process.env.PORT2 || 5173,
  default_limit: process.env.DEFAULT_LIMIT || 5,
  SECRETKEY: process.env.SECRETKEY,
  HOST: process.env.HOST,
  Paypal_client_id: process.env.PAYPAL_CLIENT_KEY,
  Paypal_client_secret: process.env.PAYPAL_SECRET_KEY,
  Paypal_url: process.env.PAYPA_URL,

  Hostport: 'http://' + process.env.HOST+':'+process.env.PORT2,
  // Hostport: process.env.HOSTPORT,

});
