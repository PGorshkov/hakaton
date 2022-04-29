<template>
  <div id="app" class="apps">
    <r-modal />
    <nav class="px-6 py-8">
      <div class="taleggio mb-6">Дашбоард</div>
      <r-select
        class="mb-5"
        title="Бригады"
        :items="brigades"
        v-model="filter.brigades"
        id-value="id"
        title-value="name"
      ></r-select>
    </nav>
    <router-view class="py-8 container"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  async mounted () {
    await this.getDirectory()
  },
  data: () => ({
    filter: {
      brigades: []
    }
  }),
  computed: {
    ...mapState('directory', ['brigades'])
  },
  methods: {
    ...mapActions('directory', ['getDirectory'])
  }
}
</script>

<style lang="scss">
.apps{
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: var(--rir-trainspotting);
  & > nav {
    flex: 0 0 344px;
    background-color: var(--rir-amelie);
  }
  & > .container{
    flex: 1 1 100%;
  }
}
</style>
