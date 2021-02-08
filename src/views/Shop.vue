<template>
  <div class="card">
    <products-filter v-model="filter" />
    <div v-if="loading" class="center">
      <app-loader />
    </div>
    <products-list v-else-if="products.length" :products="products"/>
    <div class="center" v-else>Продуктов пока нет</div>
  </div>
</template>

<script>
  import ProductsList from "@/components/shop/ProductsList";
  import AppLoader from "@/components/ui/AppLoader";
  import {useStore} from "vuex";
  import {computed, onMounted, ref} from "vue";
  import ProductsFilter from "@/components/shop/ProductsFilter";
  import {useRoute} from "vue-router";
  export default {
    setup() {
      const store = useStore();
      const route = useRoute();
      const loading = ref(true);
      const filter = ref(route.query);
      onMounted(async () => {
        loading.value = true;
        await store.dispatch('product/fetchProducts');
        await store.dispatch('cart/getCart');
        loading.value = false;
      })
      const products = computed(() => store.state.product.products
        .sort((a, b) => b.count - a.count)
        .filter(product => {
          if (filter.value.search) {
            return product.title.toLowerCase().includes(filter.value.search.toLowerCase());
          }
          return product;
        })
        .filter(product => {
          if (filter.value.category) {
            return product.category === filter.value.category;
          }
          return product;
        })
      );
      return {
        products,
        loading,
        filter
      }
    },
    components: {ProductsFilter, ProductsList, AppLoader}
  }
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
