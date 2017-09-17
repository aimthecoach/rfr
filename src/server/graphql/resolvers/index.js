import ProductResolver from './product-resolvers'
import GraphQLDate from 'graphql-date'

export default {
  Date: GraphQLDate,
  Query: {
    getProducts: ProductResolver.getProducts
  }
}
