export const state = () => ({
  categories: [],
  products: [],
  brands: [],
  productsInCart: [],
  newProducts: []
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_BRANDS(state, brands) {
    state.brands = brands;
  },
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_TO_CART(state, card) {
    state.productsInCart.push(card)
  },
  DELETE_FROM_CART(state, card) {
    const productsInCart = state.productsInCart.filter(f => f.id != card.id);
    state.productsInCart = productsInCart;
  },
  CLEAR_CART(state) {
    state.productsInCart = [];
  },
  SORT_BY_PRICE_DOWN(state) {
    const products = state.products.sort((a, b) => a.price - b.price).reverse();
    state.products = products;
  },
  SORT_BY_PRICE_UP(state) {
    const products = state.products.sort((a, b) => a.price - b.price);
    state.products = products;
  },
  SORT_BY_NEW(state) {
    const products = state.products.sort((a, b) => {
      let da = new Date(a.created).getTime();
      let db = new Date(b.created).getTime();
      return (da < db) ? 1 : (da > db) ? -1 : 0
    })
    state.products = products;
  },
  SORT_BY_DISCOUNT(state) {
    const products = state.products.sort((a, b) => {
      let sa = a.sale;
      let sb = b.sale;
      return (sa < sb) ? 1 : (sa > sb) ? -1 : 0
    })
    state.products = products;
  },
  SET_NEW_PRODUCTS(state, newProducts) {
    state.newProducts = newProducts
  }
}

export const actions = {
  async fetchCategories({ commit }) {
    let categories;
    await this.$axios
    .get("http://167.99.131.142/category/")
    .then(res => {
      res.data.map(el => {
        el.isChecked = false
      })
      categories = res.data
    })
    commit("SET_CATEGORIES", categories)
  },
  async fetchBrands({ commit }) {
    let brands;
    await this.$axios
    .get("http://167.99.131.142/product/brands/")
    .then(res => {
      res.data.map(el => {
        el.isChecked = false
      })
      brands = res.data
    })
    commit("SET_BRANDS", brands)
  },
  async fetchProducts({ commit }, payload) {
    let products;
    await this.$axios
    .get("http://167.99.131.142/product/", {params: payload})
    .then(res => {
      products = res.data.results;
    })
    commit("SET_PRODUCTS", products)
  },
  async fetchNewProducts({ commit }) {
    let newProducts;
    await this.$axios
    .get('http://167.99.131.142/product/new/')
    .then(res => {
      console.log(res.data);
      newProducts = res.data
    })
    commit("SET_NEW_PRODUCTS", newProducts)
  },
  addToCart({ commit }, card) {
    commit("ADD_TO_CART", card);
  },
  deleteFromCart({ commit }, card) {
    commit("DELETE_FROM_CART", card);
  },
  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
  sortByPriceDown({ commit }) {
    commit("SORT_BY_PRICE_DOWN");
  },
  sortByPriceUp({ commit }) {
    commit("SORT_BY_PRICE_UP");
  },
  sortByNew({ commit }) {
    commit("SORT_BY_NEW");
  },
  sortByDiscount({ commit }) {
    commit("SORT_BY_DISCOUNT")
  }
}

export const getters = {
  categories: state => state.categories,
  brands: state => state.brands,
  products: state => state.products,
  productsInCart: s => s.productsInCart,
  newProducts: s => s.newProducts
}