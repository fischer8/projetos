import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';

class ShoppingCart extends Component {
  render() {
    const items = Object.keys(localStorage).map((key) => {
      const { title, thumbnail, price, id,
      } = JSON.parse(localStorage.getItem(key));
      return (
        <CartItemCard
          key={ id }
          title={ title }
          id={ id }
          thumbnail={ thumbnail }
          price={ price }
        />
      );
    });
    return (
      <div>
        { (items.length === 0)
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <div>
              <Link data-testid="checkout-products" to="/checkout">
                Finalizar compras
              </Link>
              <div>{items}</div>
            </div>
          )}
      </div>
    );
  }
}

export default ShoppingCart;
