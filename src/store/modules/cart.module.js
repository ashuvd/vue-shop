import {errorHandler} from "@/utils/error";

export default {
  namespaced: true,
  state() {
    return {
      cart: {},
    }
  },
  mutations: {
    updateCart(state, cart) {
      state.cart = cart;
    },
  },
  actions: {
    addProduct({ commit, dispatch }, id) {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        if (cart[id] > 0) {
          cart[id]++;
        } else {
          cart[id] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        commit('updateCart', cart);
        commit('clearMessage', null, {root: true});
      } catch (error) {
        dispatch('setMessage', {
          value: errorHandler(error.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error();
      }
    },
    removeProduct({ commit, dispatch }, id) {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        if (cart[id] > 0) {
          cart[id]--;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        commit('updateCart', cart);
        commit('clearMessage', null, {root: true});
      } catch (error) {
        dispatch('setMessage', {
          value: errorHandler(error.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error();
      }
    },
    getCart({ commit, dispatch }) {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        commit('updateCart', cart);
        commit('clearMessage', null, {root: true});
      } catch (error) {
        dispatch('setMessage', {
          value: errorHandler(error.response.data.error.message),
          type: 'danger'
        }, {root: true})
        throw new Error();
      }
    },
  },
  getters: {
  }
}
