<template>
  <div>
    <h1 class="header-2">{{ item.name }}</h1>
  </div>
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
