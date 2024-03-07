// src/resolvers.ts
import { DataSourceContext } from './context';
import { Resolvers } from './types';

const resolvers: Resolvers<DataSourceContext> = {
  Query: {
    product: async (_, { _id }, { models }) => {
      return models.Product.findById(_id).exec();
    },
    productsByProducer: async (_, { producerId }, { models }) => {
      return models.Product.find({ producerId }).exec();
    },
  },
  Mutation: {
    createProducts: async (_, { products }, { models }) => {
      return models.Product.create(products);
    },
    updateProduct: async (_, { _id, product }, { models }) => {
      return models.Product.findByIdAndUpdate(_id, product, { new: true }).exec();
    },
    deleteProducts: async (_, { ids }, { models }) => {
      await models.Product.deleteMany({ _id: { $in: ids } }).exec();
      return ids;
    },
    syncProductsFromCSV: async (_, __, { models }) => {
      // Implement your CSV sync logic here
      return true;
    },
  },
};

export default resolvers;
