<template>
  <div id="app" class="apps">
    <r-modal />
    <nav class="px-6 py-8">
      <div class="taleggio mb-6">Дашбоард</div>
      <r-select
        class="mb-5"
        label ="Бригады"
        :items="brigades"
        v-model="filter.brigades"
        id-value="id"
        title-value="name"
      ></r-select>
      <DateRangePicker class="mb-6" @input="changeDateModel"/>
      <r-button
        @click="sendData"
        title="Применить"
      />
    </nav>
    <router-view class="py-8 container"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DateRangePicker from '@/components/DateRangePicker'
export default {
  components: { DateRangePicker },
  async mounted () {
    await this.getDirectory()
  },
  data: () => ({
    filter: {
      brigades: [],
      dateValue: null
    }
  }),
  computed: {
    ...mapState('directory', ['brigades'])
  },
  methods: {
    ...mapActions('directory', ['getDirectory']),
    ...mapActions('logs', ['getLogsMaps']),
    changeDateModel (val) {
      const date = new Date(val)
      this.filter.dateValue = date.getTime()
    },
    async sendData () {
      await this.getLogsMaps(this.filter)
    }
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
