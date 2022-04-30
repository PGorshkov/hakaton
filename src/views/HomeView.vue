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

export default {
  async mounted () {
    /*eslint-disable */
    await ymaps.ready(this.init)
    await this.getLogs()
  },
  data: () => ({
    center: process.env.VUE_APP_BASE_SERVICE.split(','),
    ymaps: null
  }),
  computed: {
    ...mapState('directory', ['reactors']),
    ...mapState('logs', ['logs']),
  },
  watch: {
    reactors: function () {
      this.markerReactors()
    },
    logs: function () {
      this.setRouterBrigade()
    }
  },
  methods: {
    ...mapActions('logs', ['getLogs']),
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
      // console.log('setRouterBrigade', this.logs)
      // const route = await ymaps.route([
      //   this.center,
      //   [this.reactors[1].longitude, this.reactors[1].latitude]
      // ])
      // Object.keys(this.logs).forEach(async key => {
      //
      // })
      const log = this.logs[1].steps[2]
      console.log(log)
      // console.log('setRouterBrigade', JSON.stringify([
      //   log.steps[0],
      //   log.steps[log.steps[0].length - 1]
      // ]))
      const route = await new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          log[0],
          log[log.length - 1],
          // [51.729284, 36.194391],
          // [51.5036, 35.0848],
          // [51.65873766, 37.45489353]
        ],
        // referencePoints: [
        //   log.steps[0],
        //   log.steps[log.steps[0].length - 1]
        // ],
        params: {
          results: 1
        }
      }, {
        wayPointFinishIconLayout: null,
        wayPointStartIconLayout: null
      })
      this.ymaps.geoObjects.add(route);
      // const points = route.getWayPoints()
      // const lastPoint = points.getLength() - 1;
      // points.get(0).properties.set('iconContent', null);
      // points.get(lastPoint).properties.set('iconContent', null);
      // for (var i = 0; i < route.getPaths().getLength(); i++) {
      //   const way = route.getPaths().get(i);
      //   const segments = way.getSegments();
      //   for (let j = 0; j < segments.length; j++) {
      //     var street = segments[j].getCoordinates();
      //     console.log(street);
      //
      //   }
      // }
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
