<template>
  <div class="row">
    <div class="col-md-12 mt-2 p-4 bg-white">
      <div class="brewing-menu mb-4" v-for="menu in menus" :key="menu.Id">
        <router-link :to="{ path: 'Brewing', query: { id: menu.id }}">
          <div class="d-inline-block me-2">
            <img src="@/assets/images/img_coffee.png">
          </div>
          <div class="d-inline-block">
            {{ menu.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import drip from '@/assets/source/data.json'

export default {
  name: 'Home',
  data: () => ({
    sources: drip,
    menus: []
  }),
  created () {
    const self = this
    self.sources.Brewing.forEach((brewing) => {
      self.menus.push({
        id: brewing.Id,
        name: brewing.Name
      })
    })
  }
}
</script>
<style src='@/assets/site.css'></style>
