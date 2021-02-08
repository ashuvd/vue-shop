import {computed} from "vue";
import {useStore} from "vuex";

export const useCart = () => {
  const store = useStore();
  const cart = computed(() => store.state.cart.cart);
  const add = (id) => {
    store.dispatch('cart/addProduct', id);
  }
  const remove = (id) => {
    store.dispatch('cart/removeProduct', id);
  }
  return {
    cart, add ,remove
  }
}
