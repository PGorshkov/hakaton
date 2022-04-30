<template>
  <div>
    <h1 class="camembert">{{ item.name }}</h1>
    <vue-good-table
      :columns="logColumns"
      :rows="getDataReactorLog"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'data-reactor',
  data: (vm) => ({
    logColumns: [
      {
        label: 'id',
        field: 'uuid',
        type: 'status',
        sortable: false
      },
      {
        label: 'Статус заявки',
        field: 'status_trans',
        type: 'status',
        sortable: false
      },
      {
        label: 'Время подачи заявки',
        field: 'discovered_at',
        type: 'text',
        formatFn (v) {
          return window.dayjs(v).format('DD-MM-YYYY HH:mm')
        },
        sortable: false
      },
      {
        label: 'Конец работ',
        field: 'completed_at',
        type: 'text',
        formatFn (v) {
          return window.dayjs(v).format('DD-MM-YYYY HH:mm')
        },
        sortable: false
      },
      {
        label: 'SLA',
        field: 'isSla',
        type: 'text',
        formatFn (v) {
          return v ? 'В срок' : 'Просроченное'
        },
        tdClass: vm.tdClassFunc,
        sortable: false
      }
    ]
  }),
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapState('logs', ['logs']),
    ...mapState('incidents', ['incidents']),
    getDataReactorLog () {
      return this.incidents.filter(el => el.reactor_id === this.item.id)
        .map(el => {
          const end = window.dayjs(el.discovered_at)
          const check = window.dayjs(el.completed_at).diff(end)
          const count = window.dayjs.duration(check).asHours().toFixed(2)
          return {
            ...el,
            hour: count,
            isSla: count < 4
          }
        })
    }
  },
  methods: {
    tdClassFunc (row) {
      if (!row.isSla) {
        return 'fargo--text'
      }
      return 'matrix--text'
    }
  }
}
</script>
