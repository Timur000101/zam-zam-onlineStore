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
            <select v-model="sorteType" class="form--select">
              <option class="form--select-item" value="">Без сортировки</option>
              <option
                v-for="item in sortTypes"
                :key="item.id"
                :value="item.value"
                class="form--select-item"
              >
              {{ item.text }}
              </option>
            </select>

            <select v-model="genderType" class="form--select" style="margin-left: 5px;">
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
        { id: 1, value: 'sortByPriceUp', text: 'По возрастанию цены' },
        { id: 2, value: 'sortByPriceDown', text: 'По убыванию цены' },
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
      genderType: ''
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
      let categories = this.checkedCategories.join(',')
      this.queryParams.category = categories
    },
    checkedBrands: function() {
      let brands = this.checkedBrands.join(',')
      this.queryParams.brand = brands
    },
    checkedAge: function() {
      let ages = this.checkedAge.join(',')
      this.queryParams.age = ages
    },
    sorteType: function(el) {
      if (el == "") {
        this.$store.dispatch("product/fetchProducts")
      } else {
        this.$store.dispatch(`product/${el}`)
      }
    },
    genderType: function(el) {
      console.log(el);
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
      console.log(card);
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