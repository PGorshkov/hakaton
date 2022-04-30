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
import DataRoadBrigade from '@/components/modal/DataRoadBrigade'

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
    ...mapState('directory', ['reactors', 'brigades']),
    ...mapState('logs', ['logsMap'])
  },
  watch: {
    // reactors: function () {
    //   this.markerReactors()
    // },
    logsMap: function () {
      this.ymaps.geoObjects.removeAll()
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
      this.markerReactors()
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
      for(let l of this.logsMap) {
        const brigade = this.brigades.find(br => br.id === l.brigada_id)
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
          wayPointStartIconLayout: null,
          routeStrokeColor: brigade.color.line,
          routeActiveStrokeColor: brigade.color.line,
          pinIconFillColor: brigade.color.line,
        })
        const Position =  l.routes.find(el => el.isPosition)
        if (Position) {
          const brigadePlacemark = new ymaps.Placemark(Position.points, {
            iconCaption: `Б-${l.brigada_id}`
          }, {
            preset: `islands#${brigade.color.baloon}CircleDotIcon`,
            iconCaptionMaxWidth: '50'
          })
          this.ymaps.geoObjects.add(brigadePlacemark);

          brigadePlacemark.events.add(['click'],  () => {
            this.openViewDataBrigade(l)
          })
        }
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
    },
    openViewDataBrigade (l) {
      this.$rir.modal.open(DataRoadBrigade, {
        item: l
      })
    }
  }
}
</script>
