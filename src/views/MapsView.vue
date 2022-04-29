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
import { mapState } from 'vuex'

export default {
  async mounted () {
    /*eslint-disable */
    await ymaps.ready(this.init)
  },
  data: () => ({
    center: process.env.VUE_APP_BASE_SERVICE.split(','),
    ymaps: null,
    logs: [
      {
        brigadeId: 1,
        reactor: 1,
        startDate: 1651218756,
        endDate: 1651218756,
      }
    ]
  }),
  computed: {
    ...mapState('directory', ['reactors']),
  },
  watch: {
    reactors: function () {
      this.markerReactors()
    }
  },
  methods: {
    init () {
      this.ymaps = new ymaps.Map('map', {
        center: this.center,
        zoom: 10
      })
      this.ymaps
        .geoObjects
        .add(new ymaps.Placemark(this.center, {}, {
          preset: 'islands#redCircleDotIconWithCaption',
          iconCaptionMaxWidth: '50'
        }))
      this.setRouterBrigade()
    },
    markerReactors () {
      this.reactors.forEach(r => {
        this.ymaps
          .geoObjects
          .add(new ymaps.Placemark([r.longitude, r.latitude], {
            iconCaption: `Р-${r.id}`
          }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '50'
          }))
      })
    },
    async setRouterBrigade () {
      // const route = await ymaps.route([
      //   this.center,
      //   [this.reactors[1].longitude, this.reactors[1].latitude]
      // ])
      const route = await new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          [51.7292, 36.1944],
          [51.5036, 35.0848]
        ],
        params: {
          results: 1
        }
      }, {
        wayPointFinishIconLayout: null,
        wayPointStartIconLayout: null
      })
      // const points = route.getWayPoints()
      // const lastPoint = points.getLength() - 1;
      // points.get(0).properties.set('iconContent', null);
      // points.get(lastPoint).properties.set('iconContent', null);
      this.ymaps.geoObjects.add(route);
      // for (var i = 0; i < route.getPaths().getLength(); i++) {
      //   const way = route.getPaths().get(i);
      //   const segments = way.getSegments();
      //   for (let j = 0; j < segments.length; j++) {
      //     var street = segments[j].getCoordinates();
      //     console.log(street);
      //
      //   }
      // }
    }
  }
}
</script>
