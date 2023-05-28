import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { EnvConfig } from '../config/app.config';
import axios from 'axios';

@Injectable()
export class PaymentService {
  async sendtoBillPaypal() {
    const env = EnvConfig();
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            //TOtal a pagar por el cliente
            value: '200',
          },
        },
      ],
      application_context: {
        brand_name: 'Milpa Verde',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'https://google.com/thankiu',
        cancel_url: 'https://youtube.com',
      },
    };
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const {
      data: { access_token },
    } = await axios.post(`${env.Paypal_url}/v1/oauth2/token`, params, {
      auth: {
        username: env.Paypal_client_id,
        password: env.Paypal_client_secret,
      },
    });
    const response = await axios.post(
      `${env.Paypal_url}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return response.data;
  }

  async captureOrder(orderId: string) {
    const env = EnvConfig();
    try {
      const resp = await axios.post(
        `https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          auth: {
            username: env.Paypal_client_id,
            password: env.Paypal_client_secret,
          },
        },
      );
      return resp.data;
    } catch (error) {}
  }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
