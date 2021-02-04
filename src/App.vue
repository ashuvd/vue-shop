<template>
  <component :is="layout+'-layout'" v-if="layout" />
</template>

<script>
import {computed} from 'vue';
import {useRoute} from "vue-router";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";

export default {
  setup() {
    const route = useRoute();
    const layout = computed(() => {
      console.log(route)
      return route.meta.layout
    });
    return {
      layout
    }
  },
  components: {
    MainLayout,
    AuthLayout
  }
}
</script>
