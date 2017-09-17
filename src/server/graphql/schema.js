export default `
scalar Date

type Product {
  id: ID,
  brand: String
  model: String
  description: String
  front_page_image: String
  images: [String!]
  market_reference_urls: [String]
  price: Float
  market_price: Float
  slug: String
  created_at: Date
  updated_at: Date
}

type Query {
  getProducts: [Product!]!
}

schema {
  query: Query
}
`
