import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as api from '../services/api';
import Categories from '../components/Categories';

class Home extends Component {
  state = {
    productsList: [],
    searchProduct: '',
    loading: false,
    categories: [],
  };

  async componentDidMount() {
    const categoriesApi = await api.getCategories();
    this.setState({
      categories: categoriesApi,
    });
  }

  // addItemToCart = (product) => {
  //   const prod = {
  //     title: product.title,
  //     price: product.price,
  //     id: product.id,
  //   };
  //   const localItems = JSON.parse(localStorage.getItem('cartItems')) || '';
  //   localStorage.setItem(
  //     'cartItems',
  //     JSON.stringify([...localItems, prod]),
  //   );
  // };
  updateLocalStorage = (product) => {
    const prodInfo = {
      title: product.title,
      price: product.price,
      id: product.id,
      thumbnail: product.thumbnail,
      amount: 1,
    };
    const localItem = JSON.parse(localStorage.getItem(`${prodInfo.id}`));
    if (localItem) {
      localItem.amount += 1;
      localStorage.setItem(`${localItem.id}`, JSON.stringify(localItem));
    } else {
      localStorage.setItem(`${prodInfo.id}`, JSON.stringify(prodInfo));
    }
  };

  searchProductInput = (action) => {
    const { name, value } = action.target;
    this.setState({ [name]: value });
  };

  fetchProducts = async (action) => {
    const { id } = action.target;
    const { searchProduct } = this.state;
    this.setState({ loading: true });
    const productsSearch = await api
      .getProductsFromCategoryAndQuery(id === null ? '' : id, searchProduct);
    this.setState({
      productsList: productsSearch.results,
      loading: false,
    });
  };

  render() {
    const { productsList, searchProduct, loading, categories } = this.state;
    return (
      <main>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          Carrinho de compras
        </Link>
        <form>
          <label htmlFor="search">
            <input
              data-testid="query-input"
              id="search"
              type="text"
              name="searchProduct"
              value={ searchProduct }
              onChange={ this.searchProductInput }
            />
          </label>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.fetchProducts }
          >
            Pesquisar
          </button>
        </form>
        {!productsList.length && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <section>
          { loading ? <h3>Carregando...</h3> : '' }
          { (productsList.length !== 0) && productsList.map((product, index) => (
            <div data-testid="product" key={ index }>
              <Link
                data-testid="product-detail-link"
                to={ `/description/${product.id}` }
              >
                <h3>{ product.title }</h3>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{ product.price }</p>
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.updateLocalStorage(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          )) }

          {(productsList !== '') && (productsList.length === 0) && (
            <h3>Nenhum produto foi encontrado</h3>)}
        </section>
        <div>
          {categories.map((category) => (
            <Categories
              key={ category.id }
              value={ category.name }
              id={ category.id }
              filter={ this.fetchProducts }
            />
          ))}
        </div>
      </main>
    );
  }
}

export default Home;
