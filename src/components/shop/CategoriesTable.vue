<template>
  <h4 v-if="!categories.length" class="text-center">Категорий пока нет</h4>
  <table class="table" v-else>
    <thead>
    <tr>
      <th>#</th>
      <th>Название</th>
      <th>Тип</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr :key="category.id" v-for="(category, i) in categories">
      <td>{{i+1}}</td>
      <td>{{category.title}}</td>
      <td>{{category.type}}</td>
      <td>
        <router-link v-slot="{navigate}" custom :to="{name: 'Category', params: {id: category.id}}">
          <button class="btn" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: ['categories']
}
</script>

<style scoped>

</style>
