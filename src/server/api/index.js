import express from 'express'
import featuresController from '../controllers/features'
import productsController from '../controllers/products'

const api = express.Router()

api.post('/feature', featuresController.createFeature) // ✔
api.get('/features', featuresController.getFeatures) // ✔
api.get('/feature/:id', featuresController.getFeature) // ✔
api.get('/feature/:id/product', featuresController.getFeatureWithProduct) // ✔
api.put('/feature/:id', featuresController.updateFeature) // ✔
api.delete('/feature/:id', featuresController.deleteFeature) // ✔

api.post('/product', productsController.createProduct) // ✔
api.get('/products', productsController.getProducts) // ✔
api.get('/product/:id', productsController.getProduct) // ✔
api.get('/product/:id/feature', productsController.getProductFeatures) // ✔
api.put('/product/:id', productsController.updateProduct) // ✔
api.delete('/product/:id', productsController.deleteProduct) // ✔

export default api
