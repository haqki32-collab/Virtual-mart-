/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type PaymentMethod = 'COD' | 'JazzCash';

export interface OrderDetails {
  customerName: string;
  phoneNumber: string;
  address: string;
  deliveryTime: string;
  paymentMethod: PaymentMethod;
}
