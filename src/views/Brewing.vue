<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row mt-2 mb-2">
        <div class="col-12">
          <span class="title">Name</span>
          <div class="detail">{{ brewing.Name }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-3 text-center">
          <span class="title">Coffee weight (g)</span>
          <div class="detail">{{ brewing.CoffeeWeightInGram }}</div>
        </div>
        <div class="col-2 text-center">
          <span class="title">Ratio</span>
          <div class="detail">{{ brewing.Ratio }}</div>
        </div>
        <div class="col-3 text-center">
          <span class="title">Total Water (ml)</span>
          <div class="detail">{{ brewing.CoffeeWeightInGram * brewing.Ratio }}</div>
        </div>
        <div class="col-3 text-center">
          <span class="title">Total Times (minutes)</span>
          <div class="detail">{{ getTotalTimes(brewing.Pours) }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-2 text-center" v-for="pour in information" :key="pour.WaterInMilliliter">
          <div>
            <img src="images/img_glass.png">
          </div>
          <div class="pour-water">{{ pour.WaterInMilliliter }}ml</div>
          <div class="pour-time">{{ pour.start }} - {{ pour.end }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import drip from './drip.json'

export default {
  name: 'Brewing',
  data: () => ({
    sources: drip,
    information: [],
    brewing: {}
  }),
  created () {
    const self = this
    const brewing = self.sources.Brewing.find(x => x.Id === 1)
    self.brewing = brewing
    let lastedWater = 0
    let fromTime = moment(new Date(0, 0, 0, 0, 0, 0, 0))
    brewing.Pours.forEach((pour) => {
      lastedWater = lastedWater + pour.WaterInMilliliter
      const start = fromTime.clone()
      const end = fromTime.add(pour.TimeInSecond, 'seconds')
      self.information.push({
        start: moment(start).format('mm:ss'),
        end: moment(end).format('mm:ss'),
        WaterInMilliliter: lastedWater
      })
      fromTime = end
    })
  },
  methods: {
    getTotalTimes: function (pours) {
      const data = new Date(0, 0, 0, 0, 0, 0, 0)
      for (let index = 0; index < pours.length; index++) {
        const pour = pours[index]
        data.setSeconds(data.getSeconds() + pour.TimeInSecond)
      }
      return moment(data).format('mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
