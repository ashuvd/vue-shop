<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список товаров">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import {computed, onMounted, ref} from "vue";
// import {useStore} from "vuex";
export default {
  setup() {
    const modal = ref(false);
    // const store = useStore();
    const loading = ref(false);
    onMounted(async () => {
      loading.value = true;
      // await store.dispatch('request/load');
      loading.value = false;
    })

    return {
      modal,
      loading
    }
  },
  components: {
    AppPage,
    AppLoader
  }
}
</script>
