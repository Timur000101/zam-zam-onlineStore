<template>
  <div class="cart__wrapper">
    <div class="cart__icon-wrapper" @click="cartActive = true">
      <div class="cart__icon">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.84 3.48C8.06663 3.17783 8.42229 3 8.8 3H23.2C23.5777 3 23.9334 3.17783 24.16 3.48L27.76 8.28C27.9158 8.48772 28 8.74036 28 9V25.8C28 26.7548 27.6207 27.6705 26.9456 28.3456C26.2705 29.0207 25.3548 29.4 24.4 29.4H7.6C6.64522 29.4 5.72955 29.0207 5.05442 28.3456C4.37928 27.6705 4 26.7548 4 25.8V9C4 8.74036 4.08421 8.48772 4.24 8.28L7.84 3.48ZM9.4 5.4L6.4 9.4V25.8C6.4 26.1183 6.52643 26.4235 6.75147 26.6485C6.97652 26.8736 7.28174 27 7.6 27H24.4C24.7183 27 25.0235 26.8736 25.2485 26.6485C25.4736 26.4235 25.6 26.1183 25.6 25.8V9.4L22.6 5.4H9.4Z"
            fill="#FFFFFF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 9C4 8.33726 4.53726 7.8 5.2 7.8H26.8C27.4627 7.8 28 8.33726 28 9C28 9.66274 27.4627 10.2 26.8 10.2H5.2C4.53726 10.2 4 9.66274 4 9Z"
            fill="#FFFFFF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.2 12.6C11.8627 12.6 12.4 13.1373 12.4 13.8C12.4 14.7548 12.7793 15.6705 13.4544 16.3456C14.1295 17.0207 15.0452 17.4 16 17.4C16.9548 17.4 17.8705 17.0207 18.5456 16.3456C19.2207 15.6705 19.6 14.7548 19.6 13.8C19.6 13.1373 20.1373 12.6 20.8 12.6C21.4627 12.6 22 13.1373 22 13.8C22 15.3913 21.3679 16.9174 20.2426 18.0426C19.1174 19.1679 17.5913 19.8 16 19.8C14.4087 19.8 12.8826 19.1679 11.7574 18.0426C10.6321 16.9174 10 15.3913 10 13.8C10 13.1373 10.5373 12.6 11.2 12.6Z"
            fill="#FFFFFF"
          />
        </svg>
        <div class="cart__icon__count">
          {{ this.productsInCart.length }}
        </div>
      </div>
      <span class="header__cart-title">Корзина</span>
    </div>
    <transition name="fade">
      <div
        class="cart"
        id="cart"
        v-if="cartActive"
        @keyup.esc="cartActive = false"
        tabindex="0"
      >
        <div class="cart__overlay">
          <div class="cart__content">
            <div class="cart__close" @click="cartActive = false">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                  fill="black"
                />
              </svg>
            </div>
            <h2 class="cart__title">Корзина</h2>
            <div
              v-if="!this.productsInCart.length & !purchaseOk" 
              class="cart__preview"
            >
              <span class="cart__preview__text">
                Пока что вы ничего не добавили в корзину.
              </span>
              <button
                class="btn cart__preview__btn"
                type="button"
                @click="cartActive = false"
              >
                Перейти к выбору
              </button>
            </div>
            <div class="cart__main" v-if="this.productsInCart.length">
              <h3 class="cart__subtitle">Товары в корзине</h3>
              <div class="cart__cards">
                <div 
                  class="catalog__card card"
                  v-for="card in this.productsInCart"
                  :key="card.id"
                >
                  <div class="card__img__wrapper">
                    <img class="card__img" :src="card.product_image[0].image" :alt="card.name">
                  </div>
                  <div class="card__description">
                    <h3 class="card__title">
                      {{ card.name }}
                    </h3>
                    <template v-if="card.sale_price">
                      <span class="card__price">
                        {{ numberWithCommas(card.sale_price) }}
                      </span>
                    </template>
                    <template v-else>
                      <span class="card__price">
                        {{ numberWithCommas(card.price) }}
                      </span>
                    </template>
                  </div>
                  <div
                    class="card__btn"
                    @click="deleteFromCart(card)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartActive: false,
      purchaseOk: false
    }
  },
  computed: {
    productsInCart() {
      return this.$store.getters["product/productsInCart"];
    },
  },
  methods: {
    async deleteFromCart(card) {
      await this.$store.dispatch("product/deleteFromCart", card);
    },
    async clearCart() {
      await this.$store.dispatch("product/clearCart");
      this.purchaseOk = true;
    },
    localProductsInCart() {
      const parsed = JSON.stringify(this.productsInCart);
      localStorage.setItem("localProducts", parsed);
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
  },
  mounted() {
    if(localStorage.getItem("localProducts")) {
      try {
        let localProducts = JSON.parse(localStorage.getItem("localProducts"));
        localProducts.forEach(card => {
          this.$store.dispatch("product/addToCart", card);
        });
      } catch (e) {
        localStorage.removeItem("localProducts");
      }
    }
  },
  updated() {
    this.localProductsInCart();
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/cart.scss";
</style>