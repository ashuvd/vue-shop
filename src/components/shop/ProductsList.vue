<template>
  <div class="products-table">
    <div :key="product.id" v-for="product in products" @click="toProduct(product.id)" class="product-card">
      <div class="product-img">
        <img :src="product.img" alt="img"/>
      </div>
      <h4 class="product-title">{{product.title}}</h4>
      <div v-if="product.count" class="text-center">
        <div v-if="cart[product.id] > 0" class="product-controls">
          <button class="btn danger" @click.stop="remove(product.id)">-</button>
          <strong>{{cart[product.id]}}</strong>
          <button class="btn primary" @click.stop="add(product.id)">+</button>
        </div>
        <button v-else class="btn" @click.stop="add(product.id)">{{currency(product.price)}}</button>
      </div>
      <div v-else class="text-center"><strong>Нет в наличии</strong></div>
    </div>
  </div>
</template>

<script>

import {currency} from "@/utils/currency";
import {useRouter} from "vue-router";
import {useCart} from "@/use/cart";

export default {
  props: ['products'],
  setup() {
    const router = useRouter();
    const toProduct = (id) => {
      router.push('/product/'+id);
    }
    return {
      currency,
      toProduct,
      ...useCart()
    }
  }
}
</script>

<style scoped>

</style>
