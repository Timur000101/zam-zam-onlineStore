<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <nuxt-link tag="div" to="/" class="logo">
          <img src="@/assets/images/icons/logo.svg" alt="logo">
          <span>порадует детей игрушками, а родителей ценами</span>
        </nuxt-link>
        <Cart />
      </div>
    </div>
  </header>
</template>

<script>
import Cart from "@/components/Cart.vue"
export default {
  components: {
    Cart
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
.header {
  width: 100%;
  height: 80px;
  background: $primary;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

// .header__basket {
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   span {
//     font-size: 16px;
//     color: $white;
//   }
// }

// .header__basket-icon {
//   margin-right: 5px;
//   img {
//     width: 20px;
//     height: 20px;
//   }
// }
.logo {
  display: flex;
  align-items: center;
  max-width: 310px;
  cursor: pointer;
  img {
    width: 80px;
    height: 80px;
    margin-right: 15px;
  }
  span {
    font-size: 16px;
    color: $white;
  }
}
</style>