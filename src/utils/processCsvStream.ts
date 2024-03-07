import { ReadStream } from "fs";
import csvParser from "csv-parser";
import { ProductInterface } from "../models/ProductModel";

const BATCH_SIZE = 100;

const batchUpsert = async (model: any, batch: any[]) => {
  const operations = batch.map((item: ProductInterface) => ({
    updateOne: {
      filter: {       
        vintage: item.vintage,
        name: item.name,
        producerId: item.producerId, 
      },
      update: { $set: item },
      upsert: true,
    },
  }));

  return model.bulkWrite(operations);
};

export const processCSVStream = (stream: ReadStream, models: any) => {
  const groupedProducts = new Map();

  stream
    .pipe(csvParser())
    .on('data', (data: ProductInterface) => {
      const key = `${data.vintage}-${data.name}-${data.producer.name}`;
      const product: any = {
        vintage: data.vintage,
        name: data.name,
        producer: data.producer,
        producerId: null,
      };
      if (groupedProducts.has(key)) {
        const existingProduct = groupedProducts.get(key);
        existingProduct.producerId = existingProduct.producerId || data.producer._id;
      } else {
        groupedProducts.set(key, product);
      }
    })
    .on('end', async () => {
      const producerIdsMap = new Map();
      for (const product of groupedProducts.values()) {
        if (!product.producerId) {
          const producer = product.producer;
          if (producerIdsMap.has(producer.name)) {
            product.producerId = producerIdsMap.get(producer.name);
          } else {
            const existingProducer = await models.Producer.findOne({ name: producer.name }).exec();
            if (existingProducer) {
              product.producerId = existingProducer._id;
            } else {
              const newProducer = new models.Producer(producer);
              const savedProducer = await newProducer.save();
              product.producerId = savedProducer._id;
            }
            producerIdsMap.set(producer.name, product.producerId);
          }
        }
      }
      const products = Array.from(groupedProducts.values());
      await batchUpsert(models.Product, products);
    })
    .on('error', (error: any) => {
      console.error('CSV stream error:', error);
    });
};