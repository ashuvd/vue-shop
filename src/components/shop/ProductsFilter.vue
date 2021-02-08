<template>
  <div class="products-filter">
    <div class="form-control">
      <input v-model="search" type="text" placeholder="Найти товар...">
      <span class="form-control-clear" @click="reset">&times;</span>
    </div>
    <ul class="list">
      <li class="list-item" @click="changeCategory('')">Все</li>
      <li class="list-item" :key="cat.id" v-for="cat in categories" @click="changeCategory(cat.type)">
        {{cat.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, onMounted, watch, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, {emit}) {
    const store = useStore();
    const router = useRouter();
    const search = ref(props.modelValue.search || '');
    const category = ref(props.modelValue.category || '');
    watch([search, category], ([search, category]) => {
      const query = {};
      if (search) {
        query.search = search;
      }
      if (category) {
        query.category = category;
      }
      router.push({query});
      emit('update:modelValue', {search, category});
    })
    const categories = computed(() => store.state.product.categories);
    onMounted(async () => {
      await store.dispatch('product/fetchCategories');
    })
    const changeCategory = (cat) => {
      category.value = cat;
    }
    const reset = () => {
      search.value = ''
    }
    return {
      search, category, categories, changeCategory, reset
    }
  }
}
</script>

<style scoped>

</style>
