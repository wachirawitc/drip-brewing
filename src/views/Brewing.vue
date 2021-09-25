<template>
  <div class="row mt-4 mb-4">
    <div class="col-md-12 back-home">
      <router-link :to="{ path: '/'}">
        <img class="me-2" width="20" src="@/assets/images/img_back.png"> Back
      </router-link>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-12">
          <span class="title">Name</span>
          <div class="brewing-name">{{ brewing.Name }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center count-down">
          <div class="d-inline-block me-4">
            <div v-if="timerEnabled == false" v-on:click="play()">
              <img width="80" src="@/assets/images/img_play.png">
            </div>
            <div v-on:click="pause()" v-else>
              <img width="80" src="@/assets/images/img_pause.png">
            </div>
          </div>
          <div class="d-inline-block">
            {{ currentTimeText }}
          </div>
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
          <div class="detail">{{ getTotalTimes() }}</div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-12 text-center">
          <div class="pour-box p-1 text-center" v-for="pour in information" :key="pour.WaterInMilliliter">
            <div>
              <img width="48" src="@/assets/images/img_glass_default.png" alt="Glass" v-if="pour.Status == 'Ready'">
              <img width="48" src="@/assets/images/img_glass_active.png" alt="Glass" v-else>
            </div>
            <div class="pour-water mt-1">{{ pour.PourWater }}ml</div>
            <div class="pour-time mt-2">{{ pour.startText }} - {{ pour.endText }} ({{ pour.TimeInSecond }}s)</div>
            <div class="pour-total-water">{{ pour.TotalWater }}ml</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import moment from 'moment'
import drip from './data.json'

export default {
  name: 'Brewing',
  data: () => ({
    sources: drip,
    information: [],
    brewing: {},
    timer: null,
    expiryTime: null,
    currentTimeText: '00:00',
    timerEnabled: false,
    timerCount: 600
  }),
  created () {
    const self = this
    const id = parseInt(self.$route.query.id, 10)
    let fromTime = moment(new Date(0, 0, 0, 0, 0, 0, 0))
    const brewing = self.sources.Brewing.find(x => x.Id === id)
    self.brewing = brewing
    self.timer = fromTime.clone()
    let lastedWater = 0
    brewing.Pours.forEach((pour) => {
      lastedWater = lastedWater + pour.WaterInMilliliter
      const start = fromTime.clone()
      const end = fromTime.add(pour.TimeInSecond, 'seconds')
      self.information.push({
        startTime: start,
        startText: moment(start).format('mm:ss'),
        endText: moment(end).format('mm:ss'),
        endTime: end,
        TotalWater: lastedWater,
        PourWater: pour.WaterInMilliliter,
        TimeInSecond: pour.TimeInSecond,
        Status: 'Ready'
      })
      fromTime = end
    })
    self.expiryTime = fromTime.clone()
  },
  watch: {
    timerEnabled (value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--
        }, 1000)
      }
    },
    timerCount: {
      handler (value) {
        const self = this
        if (value > 0 && self.timerEnabled) {
          setTimeout(() => {
            self.timer = self.timer.add(1, 'seconds')
            self.currentTimeText = moment(self.timer).format('mm:ss')
            self.information.forEach((pour) => {
              const isAfter = moment(self.currentTimeText, 'mm:ss').isAfter(moment(pour.startText, 'mm:ss'))
              if (isAfter) {
                pour.Status = 'Finished'
              }
            })
            self.timerCount--
          }, 1000)
        }
      },
      immediate: true
    }
  },
  methods: {
    getTotalTimes: function () {
      return moment(this.expiryTime).format('mm:ss')
    },
    play: function () {
      this.timerEnabled = true
    },
    pause: function () {
      this.timerEnabled = false
    }
  }
}
</script>

<style scoped>

</style>
