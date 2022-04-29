<template>
  <div>{{ item }}</div>
</template>

<script>
export default {
  name: 'data-reactor',
  props: {
    item: {
      type: Object
    }
  }
}
</script>
