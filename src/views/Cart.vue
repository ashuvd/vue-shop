<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center">В корзине пока ничего нет</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr :key="product.id" v-for="product in products">
        <td>Название товара</td>
        <td>
          <button class="btn primary" @click="cart[product.id]++">+</button>
          {{cart[product.id]}} шт.
          <button class="btn danger" @click="cart[product.id]--">-</button>
        </td>
        <td>{{product.price}} руб.</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{amount}} руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

const CART_MODEL = {
  '2': 3,
  '5': 1
}
//key - product id
//value - product count

export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch('product/fetchProducts');
    })
    const cart = ref(CART_MODEL);
    const products = computed(() => store.state.product.products.filter(p => (Object.keys(cart.value).includes(p.id) && cart.value[p.id] > 0)));
    const amount = computed(() => products.value.reduce((acc, p) => acc + p.price*cart.value[p.id], 0));
    return {
      products,
      cart,
      amount
    }
  }
}
</script>

<style scoped>

</style>
