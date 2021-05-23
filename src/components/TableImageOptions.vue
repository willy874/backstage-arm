<template>
  <div class="d-flex flex-center w-100">
    <div class="mx-2">{{ listData.data[listIndex].images.length }}</div>
    <RouterLink class="btn-icon" :to="{ name: detailRoute, params: { id: listData.data[listIndex].id } }">
      <Icon pattern="Visibility" size="24" />
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'TableImageOptions',
  props: {
    authDelete: {
      type: Boolean,
      default: false,
    },
    detailRoute: {
      type: String,
      default: '',
    },
    listIndex: {
      type: Number,
      required: true,
    },
    listData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
