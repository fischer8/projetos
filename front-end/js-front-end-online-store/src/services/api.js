export async function getCategories() {
  try {
    return await fetch('https://api.mercadolibre.com/sites/MLB/categories')
      .then((response) => response.json())
      .then((categories) => categories);
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    return await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
      .then((response) => response.json())
      .then((products) => products);
  } catch (error) {
    return error;
  }
}

export async function getProductById(id) {
  try {
    return await fetch(`https://api.mercadolibre.com/items/${id}`)
      .then((response) => response.json())
      .then((products) => products);
  } catch (error) {
    return error;
  }
}
