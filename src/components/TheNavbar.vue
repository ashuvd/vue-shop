<template>
  <nav class="navbar">
    <h3>Vue Shop - вход в админку test@test.ru / 123456</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
      <li>
        <router-link to="/admin">Админка</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    return {
      logout: () => {
        store.commit('auth/logout');
        router.push('/auth');
      }
    }
  }
}
</script>

<style scoped>

</style>
