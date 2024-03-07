import { ReadStream } from "fs";
import csvParser from 'csv-parser';

const BATCH_SIZE = 100;

const batchUpsert = async (model: any, batch: any[]) => {
  const operations = batch.map((item: any) => ({
    updateOne: {
      filter: { /* your filter criteria */ },
      update: { $set: item },
      upsert: true,
    },
  }));

  return model.bulkWrite(operations);
};

export const processCSVStream = (stream: ReadStream, models: any) => {
  const batch: any[] = [];

  stream
    .pipe(csvParser())
    .on('data', async (data: any) => {
      // Implement your logic to group by Vintage + Product Name + Producer
      // Add the grouped item to the batch
      batch.push(data);

      // Perform batch upsert when batch size is reached
      if (batch.length === BATCH_SIZE) {
        await batchUpsert(models.Product, batch);
        batch.length = 0; // Clear the batch array
      }
    })
    .on('end', async () => {
      // Perform final batch upsert if there are remaining items in the batch
      if (batch.length > 0) {
        await batchUpsert(models.Product, batch);
      }
    })
    .on('error', (error: any) => {
      console.error('CSV stream error:', error);
    });
};