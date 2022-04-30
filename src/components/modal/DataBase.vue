<template>
  <div class="px-4">
    <h1 class="header">Список бригад</h1>
    <vue-good-table
      :columns="teamColumns"
      @on-row-click="showTeamInfo"
      :rows="brigades"/>
  </div>

</template>

<script>
import { mapState } from 'vuex'

import DataTeam from '@/components/modal/DataTeam'
import _ from 'lodash'
export default {
  name: 'data-base',
  computed: {
    ...mapState('directory', ['brigades']),
    ...mapState('incidents', ['selectedTime']),
    ...mapState('logs', ['logs']),
    formattedBrigades () {
      // return this.logs.filter(log => log.brigada_id === this.item.id)
      //   .map(log => {
      //     const reactor = this.reactors.find(reactor => reactor.id === log.reactor_id)
      //     const incident = this.incidents.find(incident => incident.uuid === log.incident_uuid)
      //     return { ...log, reactorName: reactor?.name || '-', incidentId: incident?.uuid || '-' }
      //   })

      return _(this.logs).groupBy('brigada_id').values().map((v, k) => {
        const foundBrigade = _.find(this.brigades, { id: v[0].brigada_id })
        const foundStatus = v.find(el => window.dayjs(this.selectedTime).isBetween(el.starting_date, el.ending_date))
        return { brigadeName: foundBrigade?.name || '-', id: foundBrigade?.id, teamData: v, teamStatus: foundStatus || 'На базе' }
      }).value()
    }
  },
  data () {
    return {
      teamColumns: [
        {
          label: '№ бригады',
          field: 'id',
          type: 'text'
        },
        {
          label: 'Название бригады',
          field: 'name',
          type: 'text'
        },
        {
          label: 'Статус бригады',
          field: 'status_trans',
          type: 'text'
        }
      ]
    }
  },
  methods: {
    showTeamInfo (tableData) {
      this.$rir.modal.open(DataTeam, {
        item: tableData.row
      })
    }
  }
}
</script>
