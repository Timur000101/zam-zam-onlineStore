<template>
  <header class="header">
    <div ref="mobileMenu" class="mobileMenu">
      <div class="section__title" style="margin-bottom: 10px;">
        <h2>Категории</h2>
      </div>
      <ul>
        <li
          v-for="(item, index) in categories"
          :key="item.name"
          :to="`/catalog?category=${index+1}`"
          @click="goToTheCategory(index+1)"
        >
          {{ item.name }}
          <img src="@/assets/images/icons/arrow-down.svg" alt="">
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="header__wrapper">
        <div v-if="$route.path == '/'" @click="openMenu" class="menu-btn">
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
  },
  computed: {
    categories() {
      return this.$store.getters["product/categories"];
    },
  },
  mounted() {
    this.$store.dispatch("product/fetchCategories");
  },
  methods: {
    openMenu() {
      let body = document.querySelector('body')
      body.classList.toggle('hidden')
      this.$refs.mobileMenu.classList.toggle('open')
    },
    goToTheCategory(e) {
      let body = document.querySelector('body')
      body.classList.toggle('hidden')
      this.$refs.mobileMenu.classList.toggle('open')
      if (e) {
        this.$router.push({ path: '/catalog', query: {category: e}})
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: $primary;
  z-index: 999;
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
    width: 60px;
    height: 60px;
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

.mobileMenu {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 60px;
  left: 0;
  padding: 20px 10px;
  overflow-y: auto;
  z-index: 1000;
  background: rgb(255, 255, 255);
  transform: translateX(-100%);
  transition: transform .5s ease-in;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 16px;
      cursor: pointer;
      border-bottom: 1px solid #e8e8e8;
      img {
        width: 15px;
        height: 15px;
        transform: rotate(-90deg);
      }
    }
  }
}

.mobileMenu.open {
  transform: translateX(0);
  transition: transform .5s ease-out;
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