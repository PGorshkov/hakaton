<template>
  <date-picker :value="innerValue" @input="onInput" type="datetime" :show-second="false" :minute-step="15" format="DD.MM.YYYY HH:mm" />
</template>
<script>

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import _ from 'lodash'

export default {
  name: 'DateRangePicker',
  components: { DatePicker },
  props: {
    value: {
      type: [String, Date]
    }
  },
  data () {
    return {
      innerValue: null
    }
  },
  methods: {
    onInput (ev) {
      this.$emit('input', ev)
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        this.innerValue = _.cloneDeep(this.value)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;

  .slider {
    flex: 1
  }
}
</style>
