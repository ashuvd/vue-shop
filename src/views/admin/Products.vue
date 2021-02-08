<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Инвентарь">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <products-table :products="products"></products-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать товар" @close="modal = false">
        <product-modal @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import ProductsTable from "@/components/shop/ProductsTable";
import AppModal from "@/components/ui/AppModal";
import ProductModal from "@/components/modals/ProductModal";
import AppLoader from "@/components/ui/AppLoader";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
export default {
  setup() {
    const modal = ref(false);
    const store = useStore();
    const loading = ref(false);
    onMounted(async () => {
      loading.value = true;
      await store.dispatch('product/fetchProducts');
      loading.value = false;
    })
    const products = computed(() => store.state.product.products);
    return {
      modal,
      products,
      loading
    }
  },
  components: {
    AppPage,
    ProductsTable,
    AppModal,
    ProductModal,
    AppLoader
  }
}
</script>
