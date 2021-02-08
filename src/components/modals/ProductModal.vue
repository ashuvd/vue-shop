<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название</label>
      <input id="title" type="text" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>
    <div class="form-control" :class="{invalid: imgError}">
      <label for="img">Изображение</label>
      <input id="img" type="text" v-model="img" @blur="imgBlur">
      <small v-if="imgError">{{imgError}}</small>
    </div>
    <div class="form-control" :class="{invalid: priceError}">
      <label for="price">Цена</label>
      <input id="price" type="text" v-model="price" @blur="priceBlur">
      <small v-if="priceError">{{priceError}}</small>
    </div>
    <div class="form-control" :class="{invalid: countError}">
      <label for="count">Количество</label>
      <input id="count" type="text" v-model.number="count" @blur="countBlur">
      <small v-if="countError">{{countError}}</small>
    </div>
    <div class="form-control">
      <label for="category">Категория</label>
      <select id="category" v-model="category">
        <option value="fruit">Фрукты</option>
        <option value="vegetable">Овощи</option>
        <option value="meat">Мясо</option>
        <option value="fish">Рыба</option>
        <option value="greens">Зелень</option>
        <option value="berries">Ягоды</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import {useProductForm} from "@/use/product-form";
import {useStore} from "vuex";

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore();
    const submit = async (values) => {
      await store.dispatch('product/createProduct', values);
      emit('created');
    }
    return {
      ...useProductForm(submit)
    }
  }
}
</script>

<style scoped>

</style>
