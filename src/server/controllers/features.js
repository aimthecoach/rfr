import Feature from '../models/feature'
import Product from '../models/product'

import { createLogger } from '../utils'

const log = createLogger('@api/feature', 'magenta')

const createFeature = async (req, res) => {
  const { ...rest } = req.body
  try {
    const feature = await Feature.create({ ...rest })
    res.send(feature)
  } catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem creating the feature, try again later!'
    })
  }
}

const getFeature = async (req, res) => {
  const { id } = req.params
  try {
    const [feature] = await Feature.findAll({ where: { id } })
    if (!feature) {
      res.send({ error: true, message: 'Feature not found!' })
    }
    res.send(feature)
  } catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem getting the feature, try again later!'
    })
  }
}

const getFeatures = async (req, res) => {
  try {
    const features = await Feature.findAll()
    res.send(features)
  } catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message:
        'There was a problem getting the list of features, try again later!'
    })
  }
}

const getFeatureWithProduct = async (req, res) => {
  const { id } = req.params
  try {
    const [feature] = await Feature.findAll({ where: { id } })
    if (!feature) {
      res.send({ error: true, message: 'Feature not found!' })
    }
    const featureProduct = await Product.findOne({ id: feature.product_id })
    const result = {
      id: feature.id,
      start_at: feature.start_at,
      exp_at: feature.exp_at,
      duration: feature.duration,
      product: {
        id: featureProduct.id,
        brand: featureProduct.brand,
        model: featureProduct.model,
        price: featureProduct.price,
        market_price: featureProduct.market_price,
        description: featureProduct.description,
        front_page_image: featureProduct.front_page_image,
        images: featureProduct.images,
        market_reference_urls: featureProduct.market_reference_urls
      }
    }
    res.send(result)
  } catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message:
        'There was a problem getting the features with products, try again later!'
    })
  }
}

const updateFeature = async (req, res) => {
  const { id } = req.params
  const { ...rest } = req.body

  try {
    const [feature] = await Feature.findAll({ where: { id } })
    if (!feature) {
      res.send({ error: true, message: 'Feature not found!' })
    }
    await feature.update({ ...rest })
    res.send(feature)
  } catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem updating the feature, try again later!'
    })
  }
}

// delete -> /feature/:id
const deleteFeature = async (req, res) => {
  const { id } = req.params
  try {
    // estou a fazer call's a' db a mais
    const [feature] = await Feature.findAll({ where: { id } })

    if (!feature) {
      res.send({ error: true, message: 'Feature not found!' })
    }

    await Feature.destroy({ where: { id } })
    res.send({ deleted: true, message: 'Deleted feature with success' })
  } catch (error) {
    log(`⛔ ${error}`)
    res.send({
      error: true,
      message: 'There was a problem deleting the feature, try again later!'
    })
  }
}

export default {
  createFeature,
  getFeature,
  getFeatures,
  getFeatureWithProduct,
  updateFeature,
  deleteFeature
}
