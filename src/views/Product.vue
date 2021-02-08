<template>
  <app-page v-if="product" back center :title="product.title">
    <img :src="product.img" />
    <p>Категория: <strong>{{product.category}}</strong></p>
    <div v-if="cart[product.id] > 0" class="product-controls in-card">
      <button class="btn danger" @click="remove(product.id)">-</button>
      <strong>{{cart[product.id]}}</strong>
      <button class="btn primary" @click="add(product.id)">+</button>
    </div>
    <button v-else class="btn" @click="add(product.id)">
      {{currency(product.price)}}
    </button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Товар не найден.
  </h3>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {currency} from "@/utils/currency";
import {useCart} from "@/use/cart";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const product = ref(null);
    onMounted(async () => {
      product.value = await store.dispatch('product/fetchProductById', route.params.id);
      await store.dispatch('cart/getCart');
    })
    return {
      product,
      currency,
      ...useCart()
    }
  },
  components: {AppPage}
}
</script>

<style scoped>

</style>
