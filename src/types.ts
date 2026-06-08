/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  availabilityStatus?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  role: string;
}
