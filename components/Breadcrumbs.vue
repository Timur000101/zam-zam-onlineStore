<template>
  <div class="breadcrumbs">
    <div
      v-for="(item, index) in crumbs"
      :key="index"
    >
      <nuxt-link
        :to="item.url" 
        class="breadcrumbs__pages"
      >
        {{ item.name }}
      </nuxt-link>
      <span v-if="index < crumbs.length">/</span>
    </div>
    <div
      class="breadcrumbs__currentPage"
    >
      {{ currentPage}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      required: true
    },
    currentPage: {
      type: String
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 30px;
  &__pages {
    color: $primary;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
  &__currentPage {
    margin-left: 5px;
  }
}

.breadcrumbs__pages:nth-child(0) {
    margin-left: 0!important;
  }
</style>