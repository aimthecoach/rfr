import Product from '../../models/product'

export default {
  getProducts: async parent => {
    try {
      return Product.findAll()
    }
    catch (error) {
      throw error
    }
  }
}
