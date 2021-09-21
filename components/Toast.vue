<template>
  <div>
    <div v-if="is_active" class="toast">
      <div class="toast__body">
        <span>Товар успешно добавлен в корзину!</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    is_active: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss">
.toast {
  position: fixed;
  top: 80px;
  right: 5px;
  padding: 15px 10px;
  color: #fff;
  background: #1f96f4;
  z-index: 999;
}
</style>