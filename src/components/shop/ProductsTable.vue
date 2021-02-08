<template>
  <h4 v-if="!products.length" class="text-center">Продуктов пока нет</h4>
  <table class="table" v-else>
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Изображение</th>
      <th>Цена</th>
      <th>Категория</th>
      <th>Количество</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr :key="product.id" v-for="(product, i) in products">
      <td>{{i+1}}</td>
      <td>{{product.title}}</td>
      <td>
        <img class="table-img" :src="product.img" alt="img">
      </td>
      <td>{{currency(product.price)}}</td>
      <td>{{product.category}}</td>
      <td>{{product.count}}</td>
      <td>
        <router-link v-slot="{navigate}" custom :to="{name: 'Product', params: {id: product.id}}">
          <button class="btn" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from "@/utils/currency";

export default {
  props: ['products'],
  setup() {
    return {
      currency
    }
  }
}
</script>

<style scoped>

</style>
