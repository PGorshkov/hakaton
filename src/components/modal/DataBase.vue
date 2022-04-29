<template>
  <div class="px-4">
    <h1 class="header">Список бригад</h1>
    <vue-good-table
      :columns="teamColumns"
      :rows="teamRows"/>
  </div>

</template>

<script>
export default {
  name: 'data-base',
  data () {
    return {
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
      ]
    }
  }
}
</script>
