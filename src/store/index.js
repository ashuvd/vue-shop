import { createStore, createLogger } from 'vuex';
import auth from './modules/auth.module';
import product from './modules/product.module';
import cart from './modules/cart.module';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message);
      setTimeout(() => {
        commit('clearMessage');
      }, 5000)
    }
  },
  modules: {
    auth,
    product,
    cart
  },
  plugins
})
