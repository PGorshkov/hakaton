<template>
  <div class="home">
    <DateRangePicker v-model="dateValue"/>
    <vue-tabs>
      <v-tab title="Список бригад">
        <vue-good-table
          :columns="teamColumns"
          :rows="teamRows"/>
      </v-tab>
      <v-tab title="Сводная информация по всем бригадам">
        <vue-good-table
          :columns="totalColumns"
          :rows="totalRows"/>
      </v-tab>
      <v-tab title="Сводная информация по заявкам">
        <vue-good-table
          :columns="requestColumns"
          :rows="requestRows"/>
      </v-tab>

    </vue-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import DateRangePicker from '@/components/DateRangePicker'

export default {
  name: 'HomeView',
  components: {
    DateRangePicker
  },
  data () {
    return {
      dateValue: null,
      teamColumns: [
        {
          label: '№ бригады',
          field: 'number',
          type: 'text'
        },
        {
          label: 'Статус',
          field: 'status',
          type: 'text'
        },
        {
          label: 'Простой',
          field: 'downtime',
          type: 'text'
        },
        {
          label: 'Просрочка заявки',
          field: 'expiredTime',
          type: 'text'
        },
        {
          label: 'Время выполнения заявок',
          field: 'requestAverageTime',
          type: 'text'
        }
      ],
      teamRows: [
        { number: 1, status: 'В дороге', downtime: '4 часа', expiredTime: '', requestAverageTime: '2.5 часа' },
        { number: 2, status: 'В работе', downtime: '4 часа', expiredTime: '4 часа', requestAverageTime: '2.5 часа' },
        { number: 3, status: 'Свободна', downtime: '4 часа', expiredTime: '4 часа', requestAverageTime: '2.5 часа' },
        { number: 4, status: 'В дороге', downtime: '4 часа', expiredTime: '4 часа', requestAverageTime: '2.5 часа' },
        { number: 5, status: 'В дороге', downtime: '4 часа', expiredTime: '4 часа', requestAverageTime: '2.5 часа' },
        { number: 6, status: 'Свободна', downtime: '4 часа', expiredTime: '4 часа', requestAverageTime: '2.5 часа' }
      ],
      totalColumns: [
        {
          label: 'Суммарное время простоя всех бригад',
          field: 'totalDowntime',
          type: 'text'
        }, {
          label: 'Cуммарное время просрочки',
          field: 'totalExpiredTime',
          type: 'text'
        }, {
          label: 'суммарное количество выполненных заявок со статусом просрочки',
          field: 'totalCompletedRequests',
          type: 'number'
        }, {
          label: 'Cреднее время выполнения заявки бригадами',
          field: 'totalAverageRequestTime',
          type: 'text'
        }
      ],
      totalRows: [
        { totalDowntime: '10ч', totalExpiredTime: '1ч', totalCompletedRequests: 10, totalAverageRequestTime: '2ч' },
        { totalDowntime: '10ч', totalExpiredTime: '1ч', totalCompletedRequests: 10, totalAverageRequestTime: '2ч' },
        { totalDowntime: '10ч', totalExpiredTime: '1ч', totalCompletedRequests: 10, totalAverageRequestTime: '2ч' },
        { totalDowntime: '10ч', totalExpiredTime: '1ч', totalCompletedRequests: 10, totalAverageRequestTime: '2ч' },
        { totalDowntime: '10ч', totalExpiredTime: '1ч', totalCompletedRequests: 10, totalAverageRequestTime: '2ч' }
      ],
      requestColumns: [
        {
          label: 'Номер заявки',
          field: 'requestNumber',
          type: 'text'
        }, {
          label: 'Бригада',
          field: 'requestTeam',
          type: 'text'
        }, {
          label: 'Статус',
          field: 'requestStatus',
          type: 'text'
        },
        {
          label: 'Затраченное время',
          field: 'completingTime',
          type: 'text'
        }
      ],
      requestRows: [
        { requestNumber: '1', requestTeam: 'Бригада 1', requestStatus: 'Выполнено', completingTime: '4ч' },
        { requestNumber: '2', requestTeam: 'Бригада 2', requestStatus: 'Выполнено', completingTime: '4ч' },
        { requestNumber: '3', requestTeam: 'Бригада 4', requestStatus: 'Выполнено', completingTime: '4ч' },
        { requestNumber: '4', requestTeam: 'Бригада 5', requestStatus: 'Выполнено', completingTime: '4ч' },
        { requestNumber: '5', requestTeam: 'Бригада 4', requestStatus: 'Выполнено', completingTime: '4ч' }
      ]
    }
  }
}
</script>
