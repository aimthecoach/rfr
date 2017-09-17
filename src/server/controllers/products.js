import Product from '../models/product'
import Feature from '../models/feature'
import { createLogger } from '../utils'

const log = createLogger('@api/product', 'magenta')

// post -> /product
const createProduct = async (req, res) => {
  // falta validacao
  const { ...rest } = req.body
  // log(`🔧 ${JSON.parse(rest)}`)
  try {
    const product = await Product.create(rest)
    res.send(product)
  }
  catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem creating the product, try again later!'
    })
  }
}

// get -> /product/:id
const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    // let product = await Product.findAll({ where: { id } })
    const [product] = await Product.findAll({ where: { id } })
    log(`🔧 ${product}`)
    if (!product) {
      res.send({ error: true, message: 'Product not found!' })
    }
    res.send(product)
  }
  catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem getting the product, try again later!'
    })
  }
}

// get -> /products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.send(products)
  }
  catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message:
        'There was a problem getting the list of products, try again later!'
    })
  }
}

// get -> /product/:id/features
const getProductFeatures = async (req, res) => {
  const { id } = req.params
  try {
    const [product] = await Product.findAll({ where: { id } })
    if (!product) {
      res.send({ error: true, message: 'Product not found!' })
    }

    const features = await Feature.findAll({
      where: { product_id: product.id }
    })
    res.send(features)
  }
  catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem getting the product, try again later!'
    })
  }
}

// put -> /product/:id
const updateProduct = async (req, res) => {
  const { id } = req.params
  const { ...rest } = req.body
  try {
    const [product] = await Product.findAll({ where: { id } })
    if (!product) {
      res.send({ error: true, message: 'Product not found!' })
    }
    await product.update({ ...rest })
    res.send(product)
  }
  catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem updating the product, try again later!'
    })
  }
}

// delete -> /product/:id
const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const [product] = await Product.findAll({ where: { id } })
    if (!product) {
      res.send({ error: true, message: 'Product not found!' })
    }
    await Product.destroy({ where: { id } })
    res.send({ deleted: true, message: 'Deleted product with success' })
  }
  catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem deleting the product, try again later!'
    })
  }
}

export default {
  createProduct,
  getProduct,
  getProducts,
  getProductFeatures,
  updateProduct,
  deleteProduct
}
