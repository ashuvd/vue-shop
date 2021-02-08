import axios from '../../axios/product';
import {errorHandler} from "@/utils/error";

export default {
  namespaced: true,
  state() {
    return {
      products: [],
      categories: []
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    addCategory(state, category) {
      state.categories.push(category);
    },
  },
  actions: {
    async createProduct({commit, dispatch, rootGetters}, payload) {
      try {
        await axios.post('/products', payload);
        commit('addProduct', {...payload, id: new Date().getTime()});
        dispatch('setMessage', {
          value: 'Продукт успешно создан',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async createCategory({commit, dispatch, rootGetters}, payload) {
      try {
        await axios.post('/categories', payload);
        commit('addCategory', {...payload, id: new Date().getTime()});
        dispatch('setMessage', {
          value: 'Категория успешно создана',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async fetchProducts({ commit, dispatch }) {
      try {
        const {data} = await axios.get('/products');
        commit('setProducts', data);
        commit('clearMessage', null, {root: true});
      } catch (error) {
        dispatch('setMessage', {
          value: errorHandler(error.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error();
      }
    },
    async fetchProductById({ commit, dispatch }, id) {
      try {
        const {data} = await axios.get(`/products/${id}`);
        console.log('product data', data)
        commit('clearMessage', null, {root: true});
        return data;
      } catch (error) {
        dispatch('setMessage', {
          value: errorHandler(error.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error();
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const {data} = await axios.get('/categories');
        commit('setCategories', data);
        commit('clearMessage', null, {root: true});
      } catch (error) {
        dispatch('setMessage', {
          value: errorHandler(error.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error();
      }
    }
  },
  getters: {
  }
}
