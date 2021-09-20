<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="menu-btn">
          <svg aria-hidden="true" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-bars fa-w-14 fa-9x" style="height:26px; width:22px">
            <path fill="#fff" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" class=""></path>
          </svg>
        </div>
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

.menu-btn {
  display: none;
  align-items: center;
}

@media screen and (max-width: 790px)  {
  .logo {
    span {
      display: none;
    }
  }
  .menu-btn {
    display: flex;
  }
}
</style>