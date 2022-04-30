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
export default {
  name: 'data-base',
  computed: {
    ...mapState('directory', ['brigades'])
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
