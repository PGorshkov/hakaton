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
      <DateRangePicker class="mb-6" v-model="filter.dateValue" @input="setSelectedTime($event)"/>
      <r-button
        @click="sendData"
        title="Применить"
        class="mb-6"
      />
      <div style="display: flex;">

        <r-button
          :disabled="!filter.dateValue || !!this.live"
          class="mr-6"
          @click="sendLive"
          title="Лайв режим"
        />
        <r-button
          @click="stopLive"
          color="fargo"
          title="Стоп"
          :disabled="!this.live"
        />
      </div>
    </nav>
    <router-view class="py-8 container"/>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import DateRangePicker from '@/components/DateRangePicker'
export default {
  components: { DateRangePicker },
  async mounted () {
    await this.getDirectory()
    await this.getIncidents()
    await this.getLogs()
    // await this.getLogsMaps()
  },
  data: () => ({
    filter: {
      brigades: [],
      dateValue: null
    },
    live: null
  }),
  computed: {
    ...mapState('directory', ['brigades'])
  },
  methods: {
    ...mapActions('directory', ['getDirectory']),
    ...mapActions('logs', ['getLogsMaps', 'getLogs']),
    ...mapActions('incidents', ['getIncidents']),
    ...mapMutations('incidents', ['setSelectedTime']),
    changeDateModel (val) {
      const date = new Date(val)
      this.filter.dateValue = date.getTime()
    },
    async sendData () {
      await this.getLogsMaps(this.filter)
    },
    async sendLive () {
      this.live = setInterval(async () => {
        this.filter.dateValue = new Date(new Date(this.filter.dateValue).getTime() + 900000)
        await this.getLogsMaps(this.filter)
      }, 3000)
    },
    async stopLive () {
      clearInterval(this.live)
      this.live = null
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
