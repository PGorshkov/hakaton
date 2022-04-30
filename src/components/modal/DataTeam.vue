<template>
  <div class="px-4">
    <h1 class="header">Информация по бригаде {{ item.name }}</h1>
    <vue-good-table
      :columns="logColumns"
      :rows="teamWithLogs"/>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DataTeam',
  computed: {
    ...mapState('directory', ['reactors']),
    ...mapState('logs', ['logs']),
    teamWithLogs () {
      return this.logs.filter(log => log.brigada_id === this.item.id)
        .map(log => {
          const reactor = this.reactors.find(reactor => reactor.id === log.id)
          return { ...log, reactorName: reactor.name }
        })
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
          type: 'text'
        },
        {
          label: 'Обслуженный реактор',
          field: 'reactorName',
          type: 'text'
        },
        {
          label: 'Начало работы',
          field: 'starting_at',
          type: 'text',
          formatFn (v) {
            return window.dayjs(v).format('DD-MM-YYYY HH:mm')
          }
        },
        {
          label: 'Начало работы',
          field: 'starting_at',
          type: 'text',
          formatFn (v) {
            return window.dayjs(v).format('DD-MM-YYYY HH:mm')
          }
        }
      ]
    }
  }
}
</script>
