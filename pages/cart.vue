<template>
  <section class="section cart">
    <div class="container">
      <div class="cart__wrapper">
        <div class="cart__title">
          <h1 class="section-title">Ваша корзина</h1>
          <div class="cart__productCount">
            <p>В вашей корзине:</p>
            <span>3 товара</span>
          </div>
        </div>
        <div class="cart__content">
          <div class="cart__items">
            <div class="cart__item">
              <div class="cart__item-image">
                <img src="@/assets/images/109128.jpg" alt="109128">
              </div>
              <div class="cart__item-title">
                <h4>Кубик рубик</h4>
                <span>#321546897</span>
              </div>
              <div class="cart_item-countBtn">
                <button class="minus">
                  <img src="@/assets/images/icons/minus.svg" alt="minus">
                </button>
                <span>1 шт</span>
                <button class="plus">
                  <img src="@/assets/images/icons/plus.svg" alt="plus">
                </button>
              </div>
              <div class="cart__item-sum">
                <h4>2500 тг</h4>
              </div>
              <div class="cart__item-action">
                <button class="btn-outline cart__item-deleteBtn">Удалить</button>
              </div>
            </div>

            <div class="cart__item">
              <div class="cart__item-image">
                <img src="@/assets/images/109128.jpg" alt="109128">
              </div>
              <div class="cart__item-title">
                <h4>Кубик рубик</h4>
                <span>#321546897</span>
              </div>
              <div class="cart_item-countBtn">
                <button class="minus">
                  <img src="@/assets/images/icons/minus.svg" alt="minus">
                </button>
                <span>1 шт</span>
                <button class="plus">
                  <img src="@/assets/images/icons/plus.svg" alt="plus">
                </button>
              </div>
              <div class="cart__item-sum">
                <h4>2500 тг</h4>
              </div>
              <div class="cart__item-action">
                <button class="btn-outline cart__item-deleteBtn">Удалить</button>
              </div>
            </div>

            <div class="cart__item">
              <div class="cart__item-image">
                <img src="@/assets/images/109128.jpg" alt="109128">
              </div>
              <div class="cart__item-title">
                <h4>Кубик рубик</h4>
                <span>#321546897</span>
              </div>
              <div class="cart_item-countBtn">
                <button class="minus">
                  <img src="@/assets/images/icons/minus.svg" alt="minus">
                </button>
                <span>1 шт</span>
                <button class="plus">
                  <img src="@/assets/images/icons/plus.svg" alt="plus">
                </button>
              </div>
              <div class="cart__item-sum">
                <h4>2500 тг</h4>
              </div>
              <div class="cart__item-action">
                <button class="btn-outline cart__item-deleteBtn">Удалить</button>
              </div>
            </div>
          </div>

          <div class="cart__totalSum">
            <button @click="$router.go(-1)" class="cart__back-btn">
              <img src="@/assets/images/icons/left-arrow.svg" alt="left arrow">
              Продолжить покупки
            </button>
            <div class="totalSum">
              <span>Итого:</span>
              <h4>7500 тг</h4>
            </div>
          </div>

          <div class="cart__checkout">
            <button class="btn cart___checkout-btn">Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      data: '',
    }
  }
}
</script>