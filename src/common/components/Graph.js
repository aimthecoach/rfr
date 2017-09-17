import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { GET_PRODUCTS_QUERY } from '../modules/home'

class GraphComponent extends Component {
  componentDidMount() {}
  render() {
    console.log('@GraphComponent/apollo/props', this.props)
    const { data } = this.props
    return (
      <div>
        <h2>GraphComponent</h2>
        {data.loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {data.getProducts.map(p => (
              <li key={p.id}>
                <div>{p.brand ? p.brand : 'APOLLO'}</div>
                <div>{p.model ? p.model : 'APOLLO'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default graphql(GET_PRODUCTS_QUERY)(GraphComponent)
