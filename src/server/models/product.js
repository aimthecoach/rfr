import db from './index'
import Feature from './feature'

const { sequelize, Sequelize } = db
const Product = sequelize.define(
  'product',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    brand: {
      type: Sequelize.STRING,
      required: true
    },
    model: {
      type: Sequelize.STRING,
      required: true
    },
    description: {
      type: Sequelize.STRING,
      required: true
    },
    front_page_image: {
      type: Sequelize.STRING,
      required: true
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      required: true
    },
    market_reference_urls: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      required: true
    },

    price: {
      type: Sequelize.FLOAT,
      required: true
    },
    market_price: {
      type: Sequelize.FLOAT,
      required: true
    },
    slug: {
      type: Sequelize.STRING,
      required: true
    }
  },
  {
    underscored: true
  }
)

Product.hasMany(Feature, { as: 'product_id' })
export default Product
