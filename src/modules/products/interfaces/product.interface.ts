import { Document } from 'mongoose';

export interface Product extends Document {
  readonly productId: string;
  readonly price: number;
}
