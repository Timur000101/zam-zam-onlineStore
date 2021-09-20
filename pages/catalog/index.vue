<template>
  <section class="section catalog">
    <div class="container">
      <div class="catalog__wrapper">
        <Breadcrumbs :crumbs="breadcrumbs" :currentPage="'Каталог'" />
        <div class="catalog__title">
          <h1 class="section-title">Каталог</h1>
        </div>
        <div class="catalog__content">
          <div class="catalog__header">
            <select v-model="sorteType" class="form--select sort--select">
              <option class="form--select-item" value="">По порядку</option>
              <option
                v-for="item in sortTypes"
                :key="item.id"
                :value="item.value"
                class="form--select-item"
              >
              {{ item.text }}
              </option>
            </select>

            <select v-model="genderType" class="form--select gender--select">
              <option class="form--select-item" value="">Для всех</option>
              <option
                v-for="item in genderTypes"
                :key="item.id"
                :value="item.id"
                class="form--select-item"
              >
              {{ item.text }}
              </option>
            </select>

            <div @click="showMobileFilterMethod" class="mobile-filter">
              <span>Фильтр</span>
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318.6 300.19">
                <path d="M10.38,60.77h41a49.94,49.94,0,0,0,97.5,0H307.26a10.85,10.85,0,1,0,.94-21.68,7.37,7.37,0,0,0-.94,0H148.84a49.93,49.93,0,0,0-97.48,0h-40a10.85,10.85,0,1,0-.94,21.68Zm89.9-42.5a31.72,31.72,0,0,1,29.77,20.82h-.3A31.11,31.11,0,0,1,130,60.77h.07a31.72,31.72,0,1,1-29.82-42.5Z" style="fill:#bfbfbf"></path>
                <path d="M308.23,239.43a7.53,7.53,0,0,0-1,0H148.82a49.93,49.93,0,0,0-97.49,0h-40a10.85,10.85,0,0,0,0,21.68h40a49.93,49.93,0,0,0,97.48,0H307.28a10.85,10.85,0,0,0,1-21.68ZM100.26,282v.06A31.73,31.73,0,1,1,130,239.43h0a31.33,31.33,0,0,1,0,21.68h0A31.72,31.72,0,0,1,100.26,282Z" style="fill:#bfbfbf"></path>
                <path d="M10.38,161c.31,0,.63,0,.94,0H171.81a49.89,49.89,0,0,0,97.38,0h38.09a10.85,10.85,0,0,0,0-21.68H269.17a49.87,49.87,0,0,0-97.39,0H11.32A10.85,10.85,0,0,0,10.38,161Zm209.78-42.52a31.72,31.72,0,0,1,29.92,20.84h0c.32.85.59,1.71.83,2.58,0,.06,0,.11,0,.17.22.84.41,1.68.57,2.53a1.87,1.87,0,0,0,0,.25A31.44,31.44,0,0,1,250.07,161h0a31.69,31.69,0,0,1-59.62,0h.12a32.4,32.4,0,0,1-1.88-10.59,31.36,31.36,0,0,1,2.05-11.09h-.25A31.72,31.72,0,0,1,220.16,118.43Z" style="fill:#bfbfbf"></path>
              </svg>
            </div>
          </div>

          <div class="catalog__sidebar">
            <div class="sidebar__body">
              <div class="sidebar__item">
                <div class="sidebar__item-title">
                  <h4>Все категории</h4>
                </div>
                <div class="sidebar__item-content">
                  <div 
                    v-for="item in categories"
                    :key="'category' + item.id"
                    class="form-check"
                  >
                    <input 
                      :id="'category' + item.id" 
                      type="checkbox"
                      :value="item.id"
                      v-model="checkedCategories"
                      class="form--check-input"
                    >
                    <label :for="'category' + item.id">
                      {{ item.name }} ({{ item.count }})
                    </label>
                  </div>
                </div>
              </div>

              <div class="sidebar__item">
                <div class="sidebar__item-title">
                  <h4>Бренды</h4>
                </div>
                <div class="sidebar__item-content">
                  <div 
                    v-for="item in brands"
                    :key="'brand' + item.id"
                    class="form-check"
                  >
                    <input 
                      :id="'brand' + item.id" 
                      type="checkbox"
                      :value="item.id"
                      v-model="checkedBrands"
                      class="form--check-input"
                    >
                    <label :for="'brand' + item.id">
                      {{ item.name }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="sidebar__item">
                <div class="sidebar__item-title">
                  <h4>Возраст</h4>
                </div>
                <div class="sidebar__item-content">
                  <div 
                    v-for="item in age"
                    :key="'age' + item.id"
                    class="form-check"
                  >
                    <input 
                      :id="'age' + item.id" 
                      type="checkbox"
                      :value="item.id"
                      v-model="checkedAge"
                      class="form--check-input"
                    >
                    <label :for="'age' + item.id">
                      {{ item.value }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="catalog__items">
            <div v-for="(item, index) in products" :key="index" class="catalog__item">
              <div class="catalog__item-wrapper">
                <div v-if="item.sale != 0" class="product-discount">
                  <span class="discount-value">
                    -{{ item.sale }}%
                  </span>
                </div>
                <div class="catalog__item-image" @click="toDetailToy(item.id)">
                  <img :src="item.product_image[0].image" alt="">
                </div>
                <div class="catalog__item-content">
                  <div class="catalog__item-title" @click="toDetailToy(item.id)">
                    <h4>{{ item.name }}</h4>
                  </div>
                  <div class="catalog__item-price">
                    <span v-if="item.sale != 0">{{ numberWithCommas(item.price) }}</span>
                    <h4 v-if="item.sale == 0">{{ numberWithCommas(item.price) }}</h4>
                    <h4 v-else>{{ numberWithCommas(item.sale_price) }}</h4>
                  </div>
                </div>
                <div class="catalog__item-btn">
                  <button
                    v-if="item.available"
                    @click="addToCart(item)"
                    class="btn catalog-btn"
                  >
                    <span v-if="checkProductsInCart(item) || checkProductsIdInCart(item)">Уже в корзине</span>
                    <span v-else>В корзину</span>
                  </button>
                  <button
                    v-else
                    style="background: rgb(134 134 134);"
                    class="btn catalog-btn"
                  >
                    <span>Нет в наличии</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showMobileFilter" class="mobile__filter">
      <div class="mobile__filter-container">
        <div class="mobile__filter-header">
          <h4>Фильтр</h4>
          <div @click="showMobileFilterMethod" class="mobile__filter-close">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 189.05 202.16"><defs>
              <clipPath id="clip-path"><rect width="189.05" height="202.16" style="fill:none"></rect></clipPath></defs><title>Artboard 4</title><g style="clip-path:url(#clip-path)"><g id="close">
              <path id="close-2" d="M7.28,159.94,60.56,99.72,11.86,44.11a29.53,29.53,0,0,1-7.28-18.4A25.21,25.21,0,0,1,29.28,0c.59,0,1.17,0,1.76,0A27.59,27.59,0,0,1,53.28,11.15L95.81,63.69l43-51.79A28.19,28.19,0,0,1,160.64,0a23.87,23.87,0,0,1,24.93,22.75c0,.59,0,1.19,0,1.78a29.69,29.69,0,0,1-7.65,18.81l-49.1,54.49,52.91,60.22a31.5,31.5,0,0,1,7.28,18.4,25.66,25.66,0,0,1-25.6,25.69h-.86A29.33,29.33,0,0,1,140.32,191L93.55,134.29,46.77,190.67A29.45,29.45,0,0,1,24.9,202.16,23.86,23.86,0,0,1,0,179.41c0-.59,0-1.19,0-1.78A26.54,26.54,0,0,1,7.28,159.94Z" style="fill:#000000"></path></g></g>
            </svg>
          </div>
        </div>
        <div class="sidebar__item">
          <div class="sidebar__item-title">
            <h4>Все категории</h4>
          </div>
          <div class="sidebar__item-content">
            <div 
              v-for="item in categories"
              :key="'category' + item.id"
              class="form-check"
            >
              <input 
                :id="'category' + item.id" 
                type="checkbox"
                :value="item.id"
                v-model="checkedCategories"
                class="form--check-input"
              >
              <label :for="'category' + item.id">
                {{ item.name }} ({{ item.count }})
              </label>
            </div>
          </div>
        </div>

        <div class="sidebar__item">
          <div class="sidebar__item-title">
            <h4>Бренды</h4>
          </div>
          <div class="sidebar__item-content">
            <div 
              v-for="item in brands"
              :key="'brand' + item.id"
              class="form-check"
            >
              <input 
                :id="'brand' + item.id" 
                type="checkbox"
                :value="item.id"
                v-model="checkedBrands"
                class="form--check-input"
              >
              <label :for="'brand' + item.id">
                {{ item.name }}
              </label>
            </div>
          </div>
        </div>

        <div class="sidebar__item">
          <div class="sidebar__item-title">
            <h4>Возраст</h4>
          </div>
          <div class="sidebar__item-content">
            <div 
              v-for="item in age"
              :key="'age' + item.id"
              class="form-check"
            >
              <input 
                :id="'age' + item.id" 
                type="checkbox"
                :value="item.id"
                v-model="checkedAge"
                class="form--check-input"
              >
              <label :for="'age' + item.id">
                {{ item.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs.vue')
  },
  data() {
    return {
      checkedCategories: this.$route.query.category ? (this.$route.query.category).split(',') : [],
      checkedBrands: this.$route.query.brand ? (this.$route.query.brand).split(',') : [],
      checkedAge: this.$route.query.age ? (this.$route.query.age).split(',') : [],
      productsInCartId: [],
      queryParams: {
        category: this.$route.query.category ? (this.$route.query.category).split(',') : '',
        brand: this.$route.query.brand ? (this.$route.query.brand).split(',') : '',
        age: this.$route.query.brand ? (this.$route.query.age).split(',') : ''
      },
      sortTypes: [
        { id: 1, value: 'sortByPriceUp', text: 'По росту цены' },
        { id: 2, value: 'sortByPriceDown', text: 'По убыванию' },
        { id: 3, value: 'sortByNew', text: 'По новинкам' },
        { id: 4, value: 'sortByDiscount', text: 'По скидкам' }
      ],
      genderTypes: [
        { id: 0, value: 'sortByGirls', text: 'Девочкам' },
        { id: 1, value: 'sortByBoys', text: 'Мальчикам' },
        { id: 2, value: 'sortByBaby', text: 'Малышам' }
      ],
      age: [
        { id: 0, value: '0-12 месяцев', isChecked: false },
        { id: 1, value: '1-3 года', isChecked: false },
        { id: 2, value: '4-5 лет', isChecked: false },
        { id: 3, value: '6-8 лет', isChecked: false },
        { id: 4, value: '9-12 лет', isChecked: false },
        { id: 5, value: 'более 12 лет', isChecked: false }
      ],
      breadcrumbs: [
        { name: 'Главная', url: '/' }
      ],
      sorteType: '',
      genderType: '',
      showMobileFilter: false
    }
  },
  watch: {
    queryParams: {
      handler() {
        this.$router.push({name: 'catalog', query: this.queryParams})
        this.$store.dispatch("product/fetchProducts", this.queryParams);
      },
      deep: true
    },
    checkedCategories: function() {
      let body = document.querySelector('body')
      body.classList.toggle('body-overflow')
      let categories = this.checkedCategories.join(',')
      this.queryParams.category = categories
      this.showMobileFilter = false
    },
    checkedBrands: function() {
      let body = document.querySelector('body')
      body.classList.toggle('body-overflow')
      let brands = this.checkedBrands.join(',')
      this.queryParams.brand = brands
      this.showMobileFilter = false
    },
    checkedAge: function() {
      let body = document.querySelector('body')
      body.classList.toggle('body-overflow')
      let ages = this.checkedAge.join(',')
      this.queryParams.age = ages
      this.showMobileFilter = false
    },
    sorteType: function(el) {
      if (el == "") {
        this.$store.dispatch("product/fetchProducts")
      } else {
        this.$store.dispatch(`product/${el}`)
      }
    },
    genderType: function(el) {
      if (el == "" && el !== 0) {
        this.$store.dispatch("product/fetchProducts")
      } else {
        this.$store.dispatch("product/fetchProducts", { gender: el })
      }
    }

  },
  computed: {
    categories() {
      return this.$store.getters["product/categories"];
    },
    brands() {
      return this.$store.getters["product/brands"];
    },
    products() {
      return this.$store.getters["product/products"]
    },
    productsInCart() {
      return this.$store.getters["product/productsInCart"];
    },
  },
  mounted() {
    this.$store.dispatch("product/fetchCategories");
    this.$store.dispatch("product/fetchBrands");
    this.$store.dispatch("product/fetchProducts", this.$route.query);
    if (this.productsInCart.length) {
      this.productsInCart.forEach((c) => this.productsInCartId.push(c.id));
    }
  },
  methods: {
    async addToCart(card) {
      if(this.productsInCart.find(f => f.id == card.id) === undefined) {
        await this.$store.dispatch("product/addToCart", card)
        await this.$store.dispatch("product/fetchPopulation", card.id)
      } else {
        await this.$store.dispatch("product/deleteFromCart", card)
        this.productsInCartId = this.productsInCartId.filter(
          (c) => c != card.id
        );
      }
    },
    showMobileFilterMethod() {
      this.showMobileFilter = !this.showMobileFilter;
      let body = document.querySelector('body')
      body.classList.toggle('body-overflow')
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
    toDetailToy(id) {
      this.$router.push(`/catalog/${id}`)
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