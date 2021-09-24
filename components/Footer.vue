<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <div class="footer__menu">
          <h4>Информация о магазине</h4>
          <div class="footer__menu-item">
            <span>
              <strong>Наш Адрес:</strong> 
            </span>
            <br> 
            <span style="margin-top: 10px;">
              г.Караганда, 45 квартал, Ержанова 3-А, 2 этаж
            </span>
          </div>
          <div class="footer__menu-item">
            <span>
              <strong>Способ оплаты:</strong>
            </span>
            <br>
            <div style="margin-top: 10px; display: flex; align-items: center;">
              <img src="@/assets/images/icons/kaspi_logo.svg" alt="kaspi_logo">
              <span style="margin-left: 10px">Kaspi.kz перевод</span>
            </div>
          </div>
        </div>
        <div class="footer__contacts">
          <h4>Наши контакты</h4>
          <a href="tel:+77073135656">+7 (707) 313-56-56</a>
        </div>
        <div class="footer__schedule">
          <h4>График работы</h4>
          <div class="footer__schedule-items">
            <div class="footer__schedule-item">
              <p>Пн - Пт</p>
              <span>09:00 - 18:00</span>
            </div>
            <div class="footer__schedule-item">
              <p>Суббота</p>
              <span>10:00 - 18:00</span>
            </div>
            <div class="footer__schedule-item">
              <p>Воскресенье</p>
              <span>Выходной</span>
            </div>
          </div>
        </div>
        <div class="footer__social">
          <h4>Мы в соцсетях</h4>
          <div class="footer__social-item">
            <a href="https://www.instagram.com/zamzam_krg/">
              <img src="@/assets/images/icons/instagram.svg" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-conatiner">
        <span>
          © 2021 · Все права защищены
        </span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import "@/assets/styles/main.scss";
.footer {
  margin-top: 80px;
  background: #0087f2;
  padding: 40px 0 0 0;
}
.footer__wrapper {
  display: flex;
  justify-content: space-between;
}

.footer__menu {
  display: flex;
  flex-direction: column;
  h4 {
    margin-bottom: 15px;
    font-size: 20px;
    color: $white;
  }
  &-item {
    margin-bottom: 10px;
    font-size: 16px;
    color: $white;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }
  }
}

.footer__contacts {
  h4 {
    margin-bottom: 15px;
    font-size: 20px;
    color: $white;
  }
  a {
    font-size: 16px;
  }
}

.footer__schedule {
  h4 {
    margin-bottom: 15px;
    font-size: 20px;
    color: $white;
  }
  &-items {
    display: flex;
    flex-direction: column;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    p {
      margin-right: 15px;
      color: $white;
    }
    span {
      color: $white;
    }
  }
}

.footer__social {
  h4 {
    margin-bottom: 15px;
    font-size: 20px;
    color: $white;
  }
  a {
    img {
      width: 30px;
      height: 30px;
    }
  }
}

.footer__bottom {
  background: $primary;
  width: 100%;
  margin-top: 40px;
  padding: 25px 0;
  .footer__bottom-conatiner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  span {
    color: $white;
  }
}

@media screen and (max-width: 790px)  {
  .footer__wrapper {
    flex-direction: column;
  }
  .footer__schedule {
    max-width: 200px;
  }
  .footer__contacts {
    margin-top: 20px;
  }
  .footer__schedule {
    margin-top: 20px;
  }
  .footer__social {
    margin-top: 20px;
  }
}
</style>