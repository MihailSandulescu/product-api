// src/context.ts
import { Model } from 'mongoose';
import { ProductInterface  } from './models/ProductModel';
import { ProducerInterface } from './models/ProducerModel';


export type DataSourceContext = {
  models: {
    Product: Model<ProductInterface>;
    Producer: Model<ProducerInterface>;
  };
};

export const createContext = (productModel: Model<ProductInterface>, producerModel: Model<ProducerInterface>): DataSourceContext => {
  return {
    models: {
      Product: productModel,
      Producer: producerModel,
    },
  };
};
