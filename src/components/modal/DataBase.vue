<template>
  <div class="px-4">
    <h1 class="header">Список бригад</h1>
    <vue-good-table
      :columns="teamColumns"
      @on-row-click="showTeamInfo"
      :rows="formattedBrigades"/>
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
    ...mapState('incidents', ['selectedTime', 'incidents']),
    ...mapState('logs', ['logs']),
    formattedBrigades () {
      return _(this.logs).groupBy('brigada_id').values().map((v, k) => {
        const foundBrigade = _.find(this.brigades, { id: v[0].brigada_id })
        const foundStatus = v.find(el => {
          return !!window.dayjs(this.selectedTime).isBetween(el.starting_at, el.ending_at)
        })
        let incident = []
        const totalDistance = v.reduce((acc, curr) => {
          incident.push(curr.incident_uuid)
          if (curr.distance) {
            acc += parseFloat(curr.distance)
          }
          return acc
        }, 0)
        incident = _.compact(_.uniq(incident))
        const incedentsHoursBreak = this.incidents.reduce((acc, el) => {
          if (incident.includes(el.uuid)) {
            const end = window.dayjs(el.discovered_at)
            const check = window.dayjs(el.completed_at).diff(end)
            const count = window.dayjs.duration(check).asHours().toFixed(2)
            if (count > 4) {
              acc += check - 14400000
            }
          }
          return acc
        }, 0)
        return {
          brigadeName: foundBrigade?.name || '-',
          id: foundBrigade?.id,
          teamData: v,
          brigadeStatus: foundStatus?.status_trans || 'на базе',
          totalDistance: parseInt(totalDistance) + 'м.',
          incedentsHoursBreak
        }
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
          field: 'brigadeName',
          type: 'text'
        },
        {
          label: 'Статус бригады',
          field: 'brigadeStatus',
          type: 'text'
        },
        {
          label: 'Общее расстояние',
          field: 'totalDistance',
          type: 'text'
        },
        {
          label: 'Время просрочки',
          field: 'incedentsHoursBreak',
          type: 'text',
          formatFn (v) {
            return Math.floor(v / (1000 * 60 * 60)) + ':' + Math.floor(v / (1000 * 60)) % 60 + ':' + Math.floor(v / 1000) % 60
          }
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
