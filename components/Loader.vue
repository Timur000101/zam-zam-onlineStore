<template>
  <div class="loader">
    <video width="320" height="240" autoplay>
      <source src="../assets/rocket.mp4" type="video/mp4">
    </video>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  position: fixed;
  z-index: 99999;

  .loader_title {
    position: relative;
    top: 120px;
    font-size: 16px;
    color: #000;
  }
}
</style>