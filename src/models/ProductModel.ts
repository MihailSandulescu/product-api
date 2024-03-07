import { Schema, model, Document } from 'mongoose';
import { ProducerInterface, ProducerSchema } from './ProducerModel'; 

export interface ProductInterface extends Document {
  vintage: string;
  name: string;
  producerId: string;
  producer: ProducerInterface;
}

const productSchema = new Schema({
  vintage: { type: String, required: true },
  name: { type: String, required: true },
  producerId: { type: Schema.Types.ObjectId, ref: 'Producer', required: true },
  producer: { type: ProducerSchema, required: true },
});

export const ProductModel = model<ProductInterface>('Product', productSchema);
