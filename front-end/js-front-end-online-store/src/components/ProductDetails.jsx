import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class ProductDetails extends React.Component {
  state = {
    item: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await api.getProductById(id);
    const { title, thumbnail, price } = response;
    this.setState({
      item: { title, thumbnail, price },
    });
  }

  render() {
    const { item } = this.state;
    const { title, thumbnail, price } = item;
    return (
      <section>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">
          Adicionar ao carrinho
        </Link>
        <div>
          <h2 data-testid="product-detail-name">{ title }</h2>
          <h3 data-testid="product-detail-price">{ price }</h3>
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        </div>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default ProductDetails;
