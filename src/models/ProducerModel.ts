import { Schema, model, Document } from 'mongoose';

export interface ProducerInterface extends Document {
  name: string;
  country?: string;
  region?: string;
}

export const ProducerSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String },
  region: { type: String },
});

export const ProducerModel =  model<ProducerInterface>('Producer', ProducerSchema);
