import { gql } from 'react-apollo'

export const GET_PRODUCTS_QUERY = gql`
  query getProducts {
    getProducts {
      id
      brand
      model
      description
      front_page_image
      images
      market_reference_urls
      price
    }
  }
`
