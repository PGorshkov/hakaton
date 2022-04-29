<template>
  <div class="about">
    <div id="map" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
export default {
  async mounted () {
    /*eslint-disable */
    ymaps.ready(this.init)
    const {data: { data: reactors}} = await this.axios.get(`${process.env.VUE_APP_SERVER}reactors`)
    console.log(reactors)
    this.markerReactors(reactors)
    this.reactors = reactors
    this.setRouterBrigade()
  },
  data: () => ({
    center: process.env.VUE_APP_BASE_SERVICE.split(','),
    ymaps: null,
    reactors: [],
    logs: [
      {
        brigadeId: 1,
        reactor: 1,
        startDate: 1651218756,
        endDate: 1651218756,
      }
    ]
  }),
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
    },
    markerReactors (reactors) {
      reactors.forEach(r => {
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
      const route = await ymaps.route([
        [51.7292, 36.1944],
        [51.5036, 35.0848]
      ])
      this.ymaps.geoObjects.add(route);
      console.log('points', route.properties.get('coordinates'))
      for (var i = 0; i < route.getPaths().getLength(); i++) {
        const way = route.getPaths().get(i);
        const segments = way.getSegments();
        for (let j = 0; j < segments.length; j++) {
          var street = segments[j].getCoordinates();
          console.log(street);

        }
      }
    }
  }
}
</script>
