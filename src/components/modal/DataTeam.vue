<template>
  <div class="px-4">
    <h1 class="header">Информация по бригаде {{ item.name }}</h1>
    <div>
      <strong>Общее время простоя бригады: </strong>
      <span>{{ formattedTeamDeadTime }}</span>
    </div>
    <vue-good-table
      :columns="logColumns"
      :rows="teamWithLogs"/>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'DataTeam',
  computed: {
    ...mapState('directory', ['reactors']),
    ...mapState('logs', ['logs']),
    ...mapState('incidents', ['incidents']),
    teamWithLogs () {
      return this.logs.filter(log => log.brigada_id === this.item.id)
        .map(log => {
          const reactor = this.reactors.find(reactor => reactor.id === log.reactor_id)
          const incident = this.incidents.find(incident => incident.uuid === log.incident_uuid)
          return { ...log, reactorName: reactor?.name || '-', incidentId: incident?.uuid || '-' }
        })
    },
    teamDeadTime () {
      const filteredByStatus = _.compact(_.uniqBy(this.teamWithLogs, 'incident_uuid')).filter(team => team.status === 'task' || team.status === 'on_base')
      return filteredByStatus.reduce((acc, curr, i, arr) => {
        if (curr.status === 'on_base') {
          if (arr[i + 1]) {
            const timeDiff = arr[i + 1].starting_at - curr.starting_at
            if (timeDiff) acc += timeDiff
          }
        }
        return acc
      }, 0)
    },
    formattedTeamDeadTime () {
      if (!this.teamDeadTime) return '0ч.'
      return `${this.teamDeadTime ? `${Math.floor(this.teamDeadTime / (1000 * 60 * 60)) + ':' + Math.floor(this.teamDeadTime / (1000 * 60)) % 60 + ':' + Math.floor(this.teamDeadTime / 1000) % 60}ч.` : '0ч.'}`
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      logColumns: [
        {
          label: 'Статус бригады',
          field: 'status_trans',
          type: 'text',
          sortable: false
        },
        {
          label: 'Номер заявки',
          field: 'incidentId',
          type: 'text',
          sortable: false
        },
        {
          label: 'Обслуженный реактор',
          field: 'reactorName',
          type: 'text',
          sortable: false
        },
        {
          label: 'Начало работы',
          field: 'starting_at',
          type: 'text',
          formatFn (v) {
            return window.dayjs(v).format('DD-MM-YYYY HH:mm')
          },
          sortable: false
        },
        {
          label: 'Конец работы',
          field: 'ending_at',
          type: 'text',
          formatFn (v) {
            return v ? window.dayjs(v).format('DD-MM-YYYY HH:mm') : '-'
          },
          sortable: false
        }
      ]
    }
  }
}
</script>
