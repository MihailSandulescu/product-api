import { Schema, model, Document } from 'mongoose';

export interface ProductInterface extends Document {
  vintage: string;
  name: string;
  producerId: string;
}

const productSchema = new Schema({
  vintage: { type: String, required: true },
  name: { type: String, required: true },
  producerId: { type: Schema.Types.ObjectId, ref: 'Producer', required: true },
});

export const ProductModel = model<ProductInterface>('Product', productSchema);
