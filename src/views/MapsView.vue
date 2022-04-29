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
    function init () {
      this.ymaps = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 7
      })
    }
  },
  data: () => ({
    ymaps: null
  })
}
</script>
