<template>
  <div>
    <r-row>
      <r-col
        :cols="{
          widest: 12, wide: 12, middle: 6, narrow: 6,
        }">
        <div id="map" style="width: 100%; height: calc(100vh - 64px)"></div>
      </r-col>
    </r-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataBase from '@/components/modal/DataBase'
import DataReactor from '@/components/modal/DataReactor'
import getTimeInMeters from '@/utils/getTimeInMeters'

export default {
  async mounted () {
    /*eslint-disable */
    await ymaps.ready(this.init)
    await this.getLogsMaps()
  },
  data: () => ({
    center: process.env.VUE_APP_BASE_SERVICE.split(','),
    ymaps: null
  }),
  computed: {
    ...mapState('directory', ['reactors']),
    ...mapState('logs', ['logs']),
    logsData () {
      return this.logs
        .filter(el => ['on_road'].includes(el.status))
        .map(el => {
          el.routes = el.routes.reduce((acc, r, index) => {
            const startDate = index === 0 ? el.starting_at : acc[index - 1].endDate
            const endDate = startDate + getTimeInMeters(parseFloat(r.distance))
            acc.push({
              dist: r.distance,
              startDate,
              endDate,
              points: [r.longitude, r.latitude]
            })
            return acc
          }, [])
          return el
        })
    }
  },
  watch: {
    reactors: function () {
      this.markerReactors()
    },
    logsData: function () {
      console.log(this.ymaps)
      this.setRouterBrigade()
    }
  },
  methods: {
    ...mapActions('logs', ['getLogsMaps']),
    init () {
      this.ymaps = new ymaps.Map('map', {
        center: this.center,
        zoom: 8
      })
      const basePlacemark = new ymaps.Placemark(this.center, {}, {
        preset: 'islands#redCircleDotIconWithCaption',
        iconCaptionMaxWidth: '50'
      })
      this.ymaps
        .geoObjects
        .add(basePlacemark)
      basePlacemark.events.add(['click'],  () => {
        this.openViewDataBase()
      })
    },
    markerReactors () {
      this.reactors.forEach(r => {
        const basePlacemark = new ymaps.Placemark([r.longitude, r.latitude], {
          iconCaption: `Р-${r.id}`
        }, {
          preset: 'islands#blueCircleDotIconWithCaption',
          iconCaptionMaxWidth: '50'
        })
        this.ymaps
          .geoObjects
          .add(basePlacemark)
        basePlacemark.events.add(['click'],  () => {
          this.openViewDataReactor(r)
        })
      })
    },
    async setRouterBrigade () {
      for(let l of this.logsData) {
        const route = await new ymaps.multiRouter.MultiRoute({
          referencePoints: [
            l.routes[0].points,
            l.routes[l.routes.length - 1].points
          ],
          params: {
            results: 1
          }
        }, {
          wayPointFinishIconLayout: null,
          wayPointStartIconLayout: null
        })
        this.ymaps.geoObjects.add(route);
      }
    },
    openViewDataBase () {
      this.$rir.modal.open(DataBase, {})
    },
    openViewDataReactor (r) {
      this.$rir.modal.open(DataReactor, {
        item: r
      })
    }
  }
}
</script>
