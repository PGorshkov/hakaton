<template>
  <section>
    <r-row class="mb-6">
      <r-col
        style="text-align: center"
          class="camembert"
        :cols="{
          widest: 12, wide: 12, middle: 6, narrow: 6,
        }">
        Информация бригады
      </r-col>
    </r-row>
    <r-row class="mb-6">
      <r-col
        class="bryndza"
        :cols="{
          widest: 3, wide: 3, middle: 1, narrow: 1,
        }">
        Статус
      </r-col>
      <r-col
        :cols="{
          widest: 9, wide: 9, middle: 5, narrow: 5,
        }">
        {{ item.status_trans }}
      </r-col>
    </r-row>
    <r-row class="mb-6">
      <r-col
        class="bryndza"
        :cols="{
          widest: 3, wide: 3, middle: 1, narrow: 1,
        }">
        Инцидент
      </r-col>
      <r-col
        :cols="{
          widest: 9, wide: 9, middle: 5, narrow: 5,
        }">
        {{ item.incident_uuid }}
      </r-col>
    </r-row>
    <r-row class="mb-6" v-if="item.status !== 'work'">
      <r-col
        class="bryndza"
        :cols="{
          widest: 3, wide: 3, middle: 1, narrow: 1,
        }">
        Дистанция до объекта
      </r-col>
      <r-col
        :cols="{
          widest: 9, wide: 9, middle: 5, narrow: 5,
        }">
        {{ item.distance }} метров
      </r-col>
    </r-row>
    <r-row class="mb-6">
      <r-col
        class="bryndza"
        :cols="{
          widest: 3, wide: 3, middle: 1, narrow: 1,
        }">
        Реактор
      </r-col>
      <r-col
        :cols="{
          widest: 9, wide: 9, middle: 5, narrow: 5,
        }">
        {{ item.reactor_id }}
      </r-col>
    </r-row>
    <r-row class="mb-6">
      <r-col
        class="bryndza"
        :cols="{
          widest: 3, wide: 3, middle: 1, narrow: 1,
        }">
        Время начала
      </r-col>
      <r-col
        :cols="{
          widest: 9, wide: 9, middle: 5, narrow: 5,
        }">
        {{ getTimeRu(item.starting_at) }}
      </r-col>
    </r-row>
    <r-row class="mb-6">
      <r-col
        class="bryndza"
        :cols="{
          widest: 3, wide: 3, middle: 1, narrow: 1,
        }">
        Время примерного окончания
      </r-col>
      <r-col
        :cols="{
          widest: 9, wide: 9, middle: 5, narrow: 5,
        }">
        {{ getTimeRu(item.ending_at) }}
      </r-col>
    </r-row>
  </section>
</template>

<script>
export default {
  name: 'DataRoadBrigade',
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    getTimeRu (time) {
      return window.dayjs(time).format('DD-MM-YYYY HH:mm:ss')
    }
  }
}
</script>
