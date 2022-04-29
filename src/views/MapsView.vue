<template>
  <div class="about">
    <div id="map" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
export default {
  async mounted () {
    /*eslint-disable */
    await ymaps.ready(init)
    const center = process.env.VUE_APP_BASE_SERVICE.split(',')
    function init () {
      this.ymaps = new ymaps.Map('map', {
        center: center,
        zoom: 10
      })
    }
    const {data: { data: reactors}} = await this.axios.get(`${process.env.VUE_APP_SERVER}reactors`)
    console.log(reactors)
  },
  data: () => ({
    ymaps: null
  })
}
</script>
