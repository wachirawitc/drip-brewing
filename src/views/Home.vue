<template>
  <div class="row">
    <div class="col-md-12" v-for="item in sources.Brewing" :key="item.Name">
      <div class="row mb-2">
        <div class="col-12">
          <span>Name</span>
          <div>{{ item.Name }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-2">
          <span class="title">ปริมาณกาแฟ (g)</span>
          <div>{{ item.CoffeeWeightInGram }}</div>
        </div>
        <div class="col-2">
          <span class="title">Ratio</span>
          <div>{{ item.Ratio }}</div>
        </div>
        <div class="col-2">
          <span class="title">Total Water (ml)</span>
          <div>{{ item.CoffeeWeightInGram * item.Ratio }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-2 text-center" v-for="pour in item.Pours" :key="pour.TimeInSecond">
          <div>Time {{pour.TimeInSecond}} seconds</div>
          <div>Water {{pour.WaterInMilliliter}} ml</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drip from './drip.json'

export default {
  name: 'Home',
  data: () => ({
    sources: drip,
    summaries: []
  })
}
</script>

<style scoped>

</style>
