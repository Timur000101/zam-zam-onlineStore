<template>
  <section class="section detail">
    <div class="container">
      <div class="detail__wrapper">
        <Breadcrumbs :crumbs="breadcrumbs" :currentPage="product[0].name"/>
        <div class="detail__title">
          <h1 class="section-title">{{ product[0].name }}</h1>
        </div>
        <div class="detail__content">
          <div class="detail__slider">
            <swiper class="swiper gallery-top" :options="swiperOptions" ref="swiperTop">
              <swiper-slide
                v-for="(item, index) in product[0].product_image" 
                :key="index" 
              >
                <img :src="item.image" alt="image">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>

            <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
              <swiper-slide
                v-for="(item, index) in product[0].product_image" 
                :key="index" 
              >
                <img :src="item.image" alt="image">
              </swiper-slide>
            </swiper>
          </div>

          <div class="detail__info">
            <div class="detail__info-title">
              <div class="detail__price">
                <span v-if="product[0].sale != 0">{{ numberWithCommas(product[0].price) }}</span>
                <h4 v-if="product[0].sale == 0">{{ numberWithCommas(product[0].price) }}</h4>
                <h4 v-else>{{ numberWithCommas(product[0].sale_price) }}</h4>
              </div>
              <span>арт. {{ product[0].article }}</span>
            </div>
            <div class="detail__info-content">
              <div v-if="product[0].available" class="detail_available">
                <img src="@/assets/images/icons/check2.svg" alt="check">
                <span>Товар есть в наличии</span>
              </div>
              <div v-else class="detail_available">
                <span style="color: #ccc;">Товар нет в наличии</span>
              </div>
              <p class="detail__desc">{{ product[0].decription }}</p>
            </div>
            <div class="detail__counter">
              <button @click="count > 1 ? count-- : 1" class="minus">
                <img src="@/assets/images/icons/minus.svg" alt="minus">
              </button>
              <span>{{ count }} шт</span>
              <button @click="count++" class="plus">
                <img src="@/assets/images/icons/plus.svg" alt="plus">
              </button>
            </div>
            <template v-if="product[0].available">
              <div @click="addToCart(product[0], count)" class="detail__toCartBtn">
                <button class="btn detail__btn">Добавить в корзину</button>
              </div>
            </template>
            <template v-else>
              <div class="detail__toCartBtn">
                <button style="background: rgb(134 134 134);" class="btn detail__btn">Нет в наличии</button>
              </div>
            </template>
          </div>
        </div>

        <div v-if="similarProducts.length" class="detail__similar">
          <div class="detail__similar-title">
            <h2>Похожие товары</h2>
          </div>
          <div class="detail__similar-items">
            <div 
              v-for="item in similarProducts" 
              :key="item.id" 
              class="detail__similar-item"
            >
              <img :src="item.product_image[0].image" :alt="item.product_image[0]">
              <h4>{{ item.name }}</h4>
              <h3>{{ numberWithCommas(item.price) }}</h3>
              <nuxt-link tag="button" :to="'/catalog/' + item.id" class="btn detail__similar">
                Перейти
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios"
export default {
  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs.vue')
  },
  data() {
    return {
      count: 1,
      similarProducts: [],
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 5,
        slideToClickedSlide: true,

        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        watchSlidesVisibility: true
      },
      breadcrumbs: [
        { name: 'Главная', url: '/' },
        { name: 'Каталог', url: '/catalog' }
      ],
    }
  },
  head() {
    return {
      title: this.product[0].name
    }
  },
  asyncData ({ route }) {
    let self = this
    return axios.get('http://167.99.131.142/product/')
      .then(res => {
        let product = res.data.results.filter(el => {
          return el.id == route.params.id
        })
        return { product }
      })
  },
  computed: {
    productsInCart() {
      return this.$store.getters["product/productsInCart"];
    },
  },
  mounted() {
    axios.post('http://167.99.131.142/product/similar/', {
      id: this.$route.params.id
    })
    .then(res => {
      if (res.data.length <= 4) {
        this.similarProducts = res.data
      } else {
        this.similarProducts = res.data.splice(0, res.data.length - (res.data.length - 4));
      }
    })
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
    // if (this.productsInCart.length) {
    //   this.productsInCart.forEach((c) => this.productsInCartId.push(c.id));
    // }
  },
  methods: {
    async addToCart(card, count) {
      card.count = count
      if(this.productsInCart.find(f => f.id == card.id) === undefined) {
        await this.$store.dispatch("product/addToCart", card)
      } else {
        await this.$store.dispatch("product/deleteFromCart", card)
        this.productsInCartId = this.productsInCartId.filter(
          (c) => c != card.id
        );
      }
    },
    checkProductsInCart(card) {
      if (this.productsInCart.includes(card)) {
        return true;
      } else return false;
    },
    checkProductsIdInCart(card) {
      if (this.productsInCartId.includes(card.id)) {
        return true;
      } else return false;
    },
    numberWithCommas: function(x) {
      if (x) {
        var parts = x.toString().split(" ");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g," ");
        return parts.join(",") + ' тг';
      } else {
        return;
      }
    }
  }
}
</script>