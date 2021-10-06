<template>
  <section class="section detail">
    <Loader v-if="loader" />
    <div class="container">
      <div class="detail__wrapper">
        <Breadcrumbs :crumbs="breadcrumbs" :currentPage="product.name"/>
        <div class="detail__title">
          <h1 class="section-title">{{ product.name }}</h1>
        </div>
        <div class="detail__content">
          <div class="detail__slider">
            <swiper class="swiper gallery-top" :options="swiperOptions" ref="swiperTop">
              <swiper-slide
                v-for="(item, index) in product.product_image" 
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
                v-for="(item, index) in product.product_image" 
                :key="index" 
              >
                <img :src="item.image" alt="image">
              </swiper-slide>
            </swiper>
          </div>

          <div class="detail__info">
            <div class="detail__info-title">
              <div class="detail__price">
                <span v-if="product.sale != 0">{{ numberWithCommas(product.price) }}</span>
                <h4 v-if="product.sale == 0">{{ numberWithCommas(product.price) }}</h4>
                <h4 v-else>{{ numberWithCommas(product.sale_price) }}</h4>
              </div>
              <span>арт. {{ product.article }}</span>
            </div>
            <div class="detail__info-content">
              <div v-if="product.available" class="detail_available">
                <img src="@/assets/images/icons/check2.svg" alt="check">
                <span>Товар есть в наличии</span>
              </div>
              <div v-else class="detail_available">
                <span style="color: #ccc;">Товар нет в наличии</span>
              </div>
              <p class="detail__desc">{{ product.decription }}</p>
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
            <div class="detail__link">
              <a :href="product.link">Посмотреть видеоролик</a>
            </div>
            <template v-if="product.available">
              <div @click="addToCart(product, count)" class="detail__toCartBtn">
                <button class="btn detail__btn">
                  <span v-if="checkProductsInCart(product) || checkProductsIdInCart(product)">Уже в корзине</span>
                  <span v-else>Добавить в корзину</span>
                </button>
              </div>
            </template>
            <template v-else>
              <div class="detail__toCartBtn">
                <button style="background: rgb(134 134 134);" class="btn detail__btn">Нет в наличии</button>
              </div>
            </template>
            <div class="detail__delivery">
              <div class="detail__delivery-item">
                <img src="@/assets/images/icons/shop.svg" alt="Самовывоз">
                <p>Самовывоз</p>
                <span>Бесплатно</span>
              </div>
              <div class="detail__delivery-item">
                <img src="@/assets/images/icons/delivery.svg" alt="Самовывоз">
                <p>Доставка по городу</p>
                <span>от 300 тг</span>
              </div>
            </div>
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
    <Toast :is_active="is_active" />
  </section>
</template>

<script>
import axios from "axios"
export default {
  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs.vue'),
    Toast: () => import('@/components/Toast.vue'),
    Loader: () => import('@/components/Loader.vue'),
  },
  data() {
    return {
      count: 1,
      loader: false,
      is_active: false,
      productsInCartId: [],
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
      title: this.product.name
    }
  },
  asyncData ({ route }) {
    return axios.get('https://back.zam-zam.kz/product/' + route.params.id)
      .then(res => {
        return { product: res.data }
      })
  },
  computed: {
    productsInCart() {
      return this.$store.getters["product/productsInCart"];
    },
  },
  mounted() {
    this.loader = true
    setTimeout(() => {
      this.loader = false
    }, 1000)
    axios.post('https://back.zam-zam.kz/product/similar/', {
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
    if (this.productsInCart.length) {
      this.productsInCart.forEach((c) => this.productsInCartId.push(c.id));
    }
  },
  methods: {
    async addToCart(card, count) {
      card.count = count
      card.total_price = card.price * count
      card.sale_total_price = card.sale_price * count
      if(this.productsInCart.find(f => f.id == card.id) === undefined) {
        this.is_active = true;
        await this.$store.dispatch("product/addToCart", card)
        await this.$store.dispatch("product/fetchPopulation", card.id)
        .then((res) => {
          setTimeout(() => {
            if (res.data.status == "success")
              this.is_active = false;
            else
              return;
          }, 1000)
        })
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