<template>
  <div>
    <section class="section main-section">
      <div class="container">
        <div class="main__wrapper">
          <ul class="main__menu">
            <li class="main__menu-item">
              Каталог игрушек
              <i class="fas fa-angle-down"></i>
            </li>
            <li class="main__menu-item">
              <nuxt-link to="/catalog?gender=2">Малышам</nuxt-link>
            </li>
            <li class="main__menu-item">
              <nuxt-link to="/catalog?gender=1">Мальчикам</nuxt-link>
            </li>
            <li class="main__menu-item">
              <nuxt-link to="/catalog?gender=0">Девочкам</nuxt-link>
            </li>
            <li class="main__menu-item">
              <nuxt-link to="/">Возраст</nuxt-link>
            </li>
            <li class="main__menu-item">
              <nuxt-link to="/">Акции</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section slider">
      <div class="container">
        <div class="slider__wrapper">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide>
              <nuxt-link tag="div" to="/catalog" style="cursor: pointer;">
                <img src="@/assets/images/1.png" alt="image">
              </nuxt-link>
            </swiper-slide>
            <swiper-slide>
              <nuxt-link tag="div" to="/catalog" style="cursor: pointer;">
                <img src="@/assets/images/2.png" alt="image">
              </nuxt-link>
            </swiper-slide>
            <swiper-slide>
              <nuxt-link tag="div" to="/catalog" style="cursor: pointer;">
                <img src="@/assets/images/3.png" alt="image">
              </nuxt-link>
            </swiper-slide>
            <swiper-slide>
              <nuxt-link tag="div" to="/catalog" style="cursor: pointer;">
                <img src="@/assets/images/4.png" alt="image">
              </nuxt-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </section>

    <section class="section age">
      <div class="container">
        <div class="age__wrapper">
          <div class="section__title">
            <h4>Покупайте игрушки по возрасту</h4>
          </div>
          <div class="age__content">
            <nuxt-link tag="div" to="/catalog/?age=0" class="age__item">
              <span>0-12</span>
              <span>Месяцев</span>
            </nuxt-link>
            <nuxt-link tag="div" to="/catalog/?age=1" class="age__item">
              <span>1-3</span>
              <span>Года</span>
            </nuxt-link>
            <nuxt-link tag="div" to="/catalog/?age=2" class="age__item">
              <span>4-5</span>
              <span>Лет</span>
            </nuxt-link>
            <nuxt-link tag="div" to="/catalog/?age=3" class="age__item">
              <span>6-8</span>
              <span>Лет</span>
            </nuxt-link>
            <nuxt-link tag="div" to="/catalog/?age=4" class="age__item">
              <span>9-12</span>
              <span>Лет</span>
            </nuxt-link>
            <nuxt-link tag="div" to="/catalog/?age=5" class="age__item">
              <span>12+</span>
              <span>Лет</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section newProducts">
      <div class="container">
        <div class="newProducts__wrapper">
          <div class="section__title">
            <h4>Новые игрушки только что приземлились!</h4>
          </div>
          <div class="newProducts__items">
            <div 
              v-for="item in newProducts" 
              :key="item.id" 
              class="newProducts__item"
              @click="toDetailProduct(item.id)"
            >
              <div v-if="item.sale != 0" class="newProducts__item-discount">
                <span class="discount-value">
                  -{{ item.sale }}%
                </span>
              </div>
              <img :src="item.product_image[0].image" :alt="item.product_image[0]">
              <div class="newProducts__item-content">
                <span>арт. {{ item.article }}</span>
                <h4>{{ item.name }}</h4>
              </div>
              <!-- <h3>{{ numberWithCommas(item.price) }}</h3> -->
              <nuxt-link tag="button" :to="'/catalog/' + item.id" class="btn newProducts__button">
                Перейти
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section popular">
      <div class="container">
        <div class="popular__wrapper">
          <div class="section__title">
            <h4>Самые популярные игрушки</h4>
          </div>
          <div class="popular__items">
            <div 
              v-for="item in popularProducts"
              :key="item.id"
              class="popular__item"
            >
              <div v-if="item.sale != 0" class="popular__item-discount">
                <span class="discount-value">
                  -{{ item.sale }}%
                </span>
              </div>
              <img :src="item.product_image[0].image" :alt="item.product_image[0]">
              <div class="popular__item-content">
                <span>арт. {{ item.article }}</span>
                <h4>{{ item.name }}</h4>
              </div>
              <!-- <h3>{{ numberWithCommas(item.price) }}</h3> -->
              <nuxt-link tag="button" :to="'/catalog/' + item.id" class="btn popular__button">
                Перейти
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    newProducts() {
      return this.$store.getters["product/newProducts"]
    },
    popularProducts() {
      return this.$store.getters["product/popularProducts"]
    }
  },
  mounted() {
    this.$store.dispatch("product/fetchNewProducts"),
    this.$store.dispatch("product/fetchPopularProducts")
  },
  methods: {
    toDetailProduct(id) {
      this.$router.push(`/catalog/${id}`)
    }
  }
}
</script>
