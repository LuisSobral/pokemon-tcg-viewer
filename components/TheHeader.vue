<template>
  <header class="l-header flex justify-center align-items-center">
    <div class="text-right px-16 mt-n16">
      <h1 class="l-header__title px-16">Pokémon TCG Viewer</h1>
      <p class="l-header__description px-16">A viewer of all Pokémon TCG cards, using the <a class="l-header__link" href="https://pokemontcg.io">pokemontcg.io</a> API!</p>
      <div class="relative">
        <input v-model="name" type="text" placeholder="Search by name" class="l-header__input mt-10" @keyup.enter="searchName()" />
        <button class="absolute" @click="searchName()">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
    </div>
    <transition name="bounce">
      <button v-if="!hiddenFab" class="l-header__button absolute" @click="backToTop()">
        <font-awesome-icon :icon="['fas', 'long-arrow-alt-up']"  />
      </button>
    </transition>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheHeaderComponent extends Vue {
  hiddenFab: boolean = true
  name: string = ''

  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  }

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const top = window.pageYOffset || 0
    this.hiddenFab = top <= 250
  }

  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  searchName() {
    console.log('query', this.name)
  }
}
</script>

<style lang="scss" scoped>
.l-header {
  background-attachment: fixed;
  background-color: #554198;
  background-image: url('/download.svg'), linear-gradient(to top right, #524ad0 10%, #a28dd0);
  background-position: -50% 10%;
  background-repeat: repeat-y;
  background-size: 75% auto;
  box-sizing: border-box;
  color: #fff;
  height: 100vh;
  position: sticky;
  top: 0;

  &__title {
    font-family: $title-font;
    font-size: 85px;
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1.1;
  }

  &__description {
    font-family: $text-font;
    font-size: 0.8rem;
    font-weight: 300;
    letter-spacing: 0.175em;
    line-height: 2.5;
    text-transform: uppercase;
  }

  &__link {
    color: #fff;
    outline: 0;
  }

  &__input {
    border: 0;
    border-radius: 6px;
    padding: 12px;
    width: 100%;
  }

  &__input:focus {
    outline: 0;
  }

  &__input ~ button {
    background: none;
    border: 0;
    bottom: -20px;
    color: #554198;
    cursor: pointer;
    font-size: 20px;
    outline: 0;
    right: -10px;
    top: 20px;
  }

  &__button {
    background-color: #f44336;
    border: 0;
    border-radius: 100%;
    bottom: 25px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    height: 50px;
    outline: none;
    right: 25px;
    width: 50px;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
