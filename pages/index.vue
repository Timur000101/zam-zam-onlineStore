<template>
  <div>
    <Loader v-if="loader" />
    <section class="section main-section">
      <div class="container">
        <div class="main__wrapper">
          <ul class="main__menu">
            <ul class="main__menu-item main-section__catalog">
              Каталог игрушек
              <i class="fas fa-angle-down"></i>
              <div>
                <nuxt-link 
                  tag="li"
                  v-for="(item, index) in categories" 
                  :key="item.name" 
                  :to="`/catalog?category=${index+1}`" 
                  class="main-section__catalog-item"
                >
                  {{ item.name }}
                </nuxt-link>
              </div>
            </ul>
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
              <a href="#age">Возраст</a>
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
    
    <section class="section newProducts">
      <div class="container">
        <div class="newProducts__wrapper">
          <div class="section__title">
            <h2>Хиты продаж</h2>
          </div>
          <div class="newProducts__items">
            <swiper ref="mySwiperNew" :options="swiperOptionsNew">
              <swiper-slide 
                v-for="item in newProducts" 
                :key="item.id" 
                @click="toDetailProduct(item.id)"
              >
                <nuxt-link class="newProducts__item" :to="'/catalog/' + item.id">
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
                  <template v-if="item.sale != 0">
                    <div class="newProducts__item-price">
                      <h3>{{ $numberWithCommas(item.sale_price) }}</h3>
                      <span>
                        {{ $numberWithCommas(item.price) }}
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="newProducts__item-price">
                      <h3>{{ $numberWithCommas(item.price) }}</h3>
                    </div>
                  </template>
                  <button class="btn newProducts__button">
                    Перейти
                  </button>
                </nuxt-link>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
    </section>

    <section id="age" class="section age">
      <div class="container">
        <div class="age__wrapper">
          <div class="section__title">
            <h2>Покупайте игрушки по возрасту</h2>
          </div>
          <div class="age__content">
            <div class="age__item">
              <nuxt-link to="/catalog/?age=0" class="age__item-body">
                <span>0-12</span>
                <span>Месяцев</span>
              </nuxt-link>
            </div>
            <div class="age__item">
              <nuxt-link tag="div" to="/catalog/?age=1" class="age__item-body">
                <span>1-3</span>
                <span>Года</span>
              </nuxt-link>
            </div>
            <div class="age__item">
              <nuxt-link tag="div" to="/catalog/?age=2" class="age__item-body">
                <span>4-5</span>
                <span>Лет</span>
              </nuxt-link>
            </div>
            <div class="age__item">
              <nuxt-link tag="div" to="/catalog/?age=3" class="age__item-body">
                <span>6-8</span>
                <span>Лет</span>
              </nuxt-link>
            </div>
            <div class="age__item">
              <nuxt-link tag="div" to="/catalog/?age=4" class="age__item-body">
                <span>9-12</span>
                <span>Лет</span>
              </nuxt-link>
            </div>
            <div class="age__item">
              <nuxt-link tag="div" to="/catalog/?age=5" class="age__item-body">
                <span>12+</span>
                <span>Лет</span>
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
            <h2>Самые популярные игрушки</h2>
          </div>
          <div class="popular__items">
            <swiper ref="mySwiperPopular" :options="swiperOptionsPopular">
              <swiper-slide 
                v-for="item in popularProducts"
                :key="item.id"
              >
                <nuxt-link class="popular__item" :to="'/catalog/' + item.id">
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
                  <template v-if="item.sale != 0">
                    <div class="popular__item-price">
                      <h3>{{ $numberWithCommas(item.sale_price) }}</h3>
                      <span>
                        {{ $numberWithCommas(item.price) }}
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="popular__item-price">
                      <h3>{{ $numberWithCommas(item.price) }}</h3>
                    </div>
                  </template>
                  <button class="btn popular__button">
                    Перейти
                  </button>
                </nuxt-link>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
    </section>

    <section class="section reviews">
      <div class="container">
        <div class="reviews__wrapper">
          <div class="section__title">
            <h2>Отзывы покупателей</h2>
          </div>
          <div class="reviews__items">
            <swiper ref="mySwiperReviews" :options="swiperOptionsReviews">
              <swiper-slide class="reviews__item">
                <p>Спасибо замзам только у вас заказываю игрушки всегда целые и рабочие игрушки 
                  👍🏽 детям радость и мы довольны
                </p>
                <h4>Алена</h4>
              </swiper-slide>
              <swiper-slide class="reviews__item">
                <p>замзам спасибо! Дом большой и шикарный гирлянда в комплекте нас очень порадовала! 
                  Подарили на день рождения, спустя полтора месяца ещё играем каждый день
                </p>
                <h4>Ляззат</h4>
              </swiper-slide>
              <swiper-slide class="reviews__item">
                <p>Спасибо за быструю доставку и за возможность не ездить по магазинам! 
                  Хорошие качественные игрушки на любой возраст
                </p>
                <h4>Света</h4>
              </swiper-slide>
              <swiper-slide class="reviews__item">
                <p>здравствуйте большое спасибо сын очень 
                  рад новым игрушкам😊 просто восторге! 
                  Качество отличное доставка быстрая ставлю пять 🖐 звёзд 
                </p>
                <h4>Карина</h4>
              </swiper-slide>
              <swiper-slide class="reviews__item">
                <p>Спасибо замзам за шикарные игрушки за ассортимент. 
                  Качественные игрушки за приемлемую стоимость и 
                  доставка быстрая
                </p>
                <h4>Верусик</h4>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
    Loader: () => import('@/components/Loader.vue')
  },
  data() {
    return {
      loader: false,
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionsNew: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      swiperOptionsPopular: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      swiperOptionsReviews: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    swiperNew() {
      return this.$refs.mySwiperNew.$swiper
    },
    swiperPopular() {
      return this.$refs.mySwiperPopular.$swiper
    },
    swiperReviews() {
      return this.$refs.mySwiperReviews.$swiper
    },
    newProducts() {
      return this.$store.getters["product/newProducts"]
    },
    popularProducts() {
      return this.$store.getters["product/popularProducts"]
    },
    categories() {
      return this.$store.getters["product/categories"];
    },
  },
  mounted() {
    this.loader = true
    this.$store.dispatch("product/fetchCategories");
    this.$store.dispatch("product/fetchNewProducts");
    this.$store.dispatch("product/fetchPopularProducts")
    setTimeout(() => {
      this.loader = false
    }, 1500)
  },
}
</script>
