<template>
  <div class="row">
    <div class="col-md-12" v-for="item in sources.Brewing" :key="item.Name">
      <div class="row mt-2 mb-2">
        <div class="col-12">
          <span class="title">Name</span>
          <div>{{ item.Name }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-3 text-center">
          <span class="title">ปริมาณกาแฟ (g)</span>
          <div>{{ item.CoffeeWeightInGram }}</div>
        </div>
        <div class="col-2 text-center">
          <span class="title">Ratio</span>
          <div>{{ item.Ratio }}</div>
        </div>
        <div class="col-3 text-center">
          <span class="title">Total Water (ml)</span>
          <div>{{ item.CoffeeWeightInGram * item.Ratio }}</div>
        </div>
        <div class="col-3 text-center">
          <span class="title">Total Times (minutes)</span>
          <div>{{ getTotalTimes(item.Pours) }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-2 text-center" v-for="pour in item.Pours" :key="pour.TimeInSecond">
          <div>Time {{ pour.TimeInSecond }} seconds</div>
          <div>Water {{ pour.WaterInMilliliter }} ml</div>
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
  }),
  methods: {
    getTotalTimes: function (pours) {
      const data = new Date(0, 0, 0, 0, 0, 0, 0)
      for (let index = 0; index < pours.length; index++) {
        const pour = pours[index]
        data.setSeconds(data.getSeconds() + pour.TimeInSecond)
      }
      return data.getMinutes() + ':' + data.getSeconds()
    }
  }
}
</script>

<style scoped>

</style>
