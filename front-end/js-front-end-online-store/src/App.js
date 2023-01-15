import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

import ProductDetails from './components/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />

          <Route path="/shopping-cart" component={ ShoppingCart } />
          <Route
            path="/description/:id"
            render={ (props) => <ProductDetails { ...props } /> }
          />
          <Route exact path="/checkout" component={ Checkout } />

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
