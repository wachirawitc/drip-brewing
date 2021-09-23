<template>
  <div class="row">
    <div class="col-md-12">
      <router-link :to="{ path: 'Brewing', query: { id: 1 }}">Brewing</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    summaries: []
  }),
  methods: {
    getTotalTimes: function () {
      return 0
    }
  }
}
</script>

<style scoped>

</style>
