<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: titleError}">
      <label for="title">Название</label>
      <input id="title" type="text" v-model="title" @blur="titleBlur">
      <small v-if="titleError">{{titleError}}</small>
    </div>
    <div class="form-control" :class="{invalid: typeError}">
      <label for="type">Название</label>
      <input id="type" type="text" v-model="type" @blur="typeBlur">
      <small v-if="typeError">{{typeError}}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import {useCategoryForm} from "@/use/category-form";
import {useStore} from "vuex";

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore();
    const submit = async (values) => {
      await store.dispatch('product/createCategory', values);
      emit('created');
    }
    return {
      ...useCategoryForm(submit)
    }
  }
}
</script>

<style scoped>

</style>
