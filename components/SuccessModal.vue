<template>
  <div v-if="showModal" @click.stop="closeModal" class="success__wrapper">
    <div class="success__modal">
      <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"> 
        <path 
          d="M52.9999 0C23.7289 0 0 23.7289 0 52.9999C0 82.2709 23.7289 106 52.9999 106C82.2709 106 106 82.2709 106 52.9999C105.969 23.742 82.258 0.0312765 52.9999 0ZM52.9999 98.4284C27.9104 98.4284 7.57135 78.0894 7.57135 52.9999C7.57135 27.9104 27.9104 7.57135 52.9999 7.57135C78.0894 7.57135 98.4284 27.9104 98.4284 52.9999C98.4014 78.0783 78.0783 98.4014 52.9999 98.4284Z" 
          fill="#7DE13F" 
        /> 
        <path 
          d="M82.0833 31.395C80.6162 29.978 78.2904 29.978 76.8235 31.395L41.6428 66.5755L29.1764 54.1091C27.7239 52.6051 25.3271 52.5637 23.8234 54.0161C22.3195 55.4686 22.278 57.8653 23.7305 59.3691C23.7609 59.4006 23.7919 59.4316 23.8234 59.462L38.9663 74.6049C40.4445 76.0829 42.8411 76.0829 44.3193 74.6049L82.1765 36.7477C83.6289 35.244 83.5872 32.8475 82.0833 31.395Z" 
          fill="#7DE13F" 
        /> 
      </svg>
      <h2>Отлично!</h2>
      <p>
        Теперь, чтобы подтвердить заказ отправьте на каспи номер 
        <a href="tel:+77073135656">+7(707)313-56-56</a>
      </p>
      <h4>{{ $numberWithCommas(totalCount) }}</h4>
      <p>После, отправьте чек на этот же номер Whatsapp</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.success__wrapper { 
  position: fixed; 
  width: 100%; 
  height: 100%; 
  justify-content: center; 
  align-items: center; 
  display: flex; 
  z-index: 213; 
  margin: 0 auto; 
  padding: 0 16px 80px 16px;
  left: 0;
  top: 0;
  &::before { 
    position: fixed; 
    top: 0; 
    bottom: 0; 
    content: ''; 
    width: 100%; 
    height: 100%; 
    background: #000; 
    opacity: 0.5; 
  } 
} 
.success__modal { 
  position: relative; 
  z-index: 220; 
  width: 60%; 
  background: #fff; 
  border-radius: 10px; 
  display: flex; 
  align-items: center; 
  padding: 16px; 
  text-align: center; 
  flex-direction: column; 
  justify-content: center; 
  h2 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 15px;
    font-size: 16px;
    a {
      color: rgb(64, 64, 223);
      font-weight: 500;
      display: inline-block;
    }
  }
  h4 {
    font-size: 22px;
    color: #7DE13F;
    margin-top: 10px;
  }
}

@media (max-width: 926px) {
  .success__modal {
    width: 100%;
  }
}
</style>