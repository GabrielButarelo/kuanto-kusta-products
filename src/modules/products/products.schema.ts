import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  productId: String,
  price: Number,
});
