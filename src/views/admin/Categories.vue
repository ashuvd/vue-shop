<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Категории">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <categories-table :categories="categories"></categories-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать категорию" @close="modal = false">
        <category-modal @created="modal = false"/>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import CategoriesTable from "@/components/shop/CategoriesTable";
import AppModal from "@/components/ui/AppModal";
import CategoryModal from "@/components/modals/CategoryModal";
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
      await store.dispatch('product/fetchCategories');
      loading.value = false;
    })
    const categories = computed(() => store.state.product.categories);
    return {
      modal,
      categories,
      loading
    }
  },
  components: {
    AppPage,
    CategoriesTable,
    AppModal,
    CategoryModal,
    AppLoader
  }
}
</script>
