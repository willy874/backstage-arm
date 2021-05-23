<template>
  <PageLayout>
    <RouterSwitch v-bind="_assignPropsData">
      <template #list>
        <List v-bind="_assignPropsData" />
      </template>
    </RouterSwitch>
  </PageLayout>
</template>
<script>
import List from './List.vue'

export default {
  name: 'Banner',
  data() {
    return {
      routerName: 'Banner',
    }
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    List,
  },
}
</script>
