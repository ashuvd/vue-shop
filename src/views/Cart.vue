<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 v-if="!products.length" class="text-center">В корзине пока ничего нет</h3>
    <table v-else class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr :key="product.id" v-for="product in products">
        <td>{{product.title}}</td>
        <td>
          <button class="btn primary" @click="add(product.id)">+</button>
          {{cart[product.id]}} шт.
          <button class="btn danger" @click="remove(product.id)">-</button>
        </td>
        <td>{{product.price}} руб.</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{currency(amount)}}</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useCart} from "@/use/cart";
import {currency} from "@/utils/currency";

export default {
  setup() {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch('cart/getCart');
      await store.dispatch('product/fetchProducts');
    })
    const {cart, add ,remove} = useCart();
    const products = computed(() => store.state.product.products.filter(p => cart.value[p.id] && cart.value[p.id] > 0));
    const amount = computed(() => products.value.reduce((acc, p) => acc + p.price*cart.value[p.id], 0));
    return {
      products,
      cart,
      amount,
      add,
      remove,
      currency
    }
  }
}
</script>

<style scoped>

</style>
