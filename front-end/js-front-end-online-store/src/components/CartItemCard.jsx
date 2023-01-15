import { Component } from 'react';
import { string, number } from 'prop-types';

export default class CartItemCard extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    this.state = {
      amount: JSON.parse(localStorage.getItem(`${id}`)).amount,
    };
  }

  updateItemAmount = (id, operator) => {
    const localItem = JSON.parse(localStorage.getItem(`${id}`));
    localItem.amount = (operator === '+')
      ? localItem.amount += 1
      : localItem.amount -= 1;
    localStorage.setItem(`${localItem.id}`, JSON.stringify(localItem));
    this.setState({ amount: localItem.amount });
  };

  deleteItem = ({ target }, id) => {
    localStorage.removeItem(`${id}`);
    target.parentNode.remove();
  };

  render() {
    const { title, thumbnail, price, id } = this.props;
    const { amount } = this.state;
    return (
      <div>
        <button
          data-testid="remove-product"
          type="button"
          onClick={ (e) => this.deleteItem(e, id) }
        >
          x
        </button>
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <img src={ thumbnail } alt={ title } />
        <p>
          R$
          {price}
        </p>
        <button
          disabled={ amount === 1 }
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => this.updateItemAmount(id, '-') }
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">
          {amount}
        </p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => this.updateItemAmount(id, '+') }
        >
          +
        </button>
      </div>
    );
  }
}

CartItemCard.propTypes = {
  title: string.isRequired,
  thumbnail: string.isRequired,
  price: number.isRequired,
  id: string.isRequired,
};
