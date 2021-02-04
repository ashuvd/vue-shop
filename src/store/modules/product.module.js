import axios from '../../axios/product';
import {errorHandler} from "@/utils/error";

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
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
    }
  },
  getters: {
  }
}
