<template>
  <div>
    <transition-group
      name="load"
      tag="section"
      class="l-main pa-4 md:grid md:grid-columns-2 xl:px-6 xl:py-8"
    >
      <InformationCard
        v-for="(card, index) in cards"
        :key="`${card.id}_${index}`"
        :card="card"
      />
      <div ref="observable" :key="'OBSERVABLE_DIV'" class="l-main__observable">
        <p v-if="$fetchState.pending" class="text-center my-6">Loading...</p>
      </div>
    </transition-group>
    <div ref="carousel" class="l-carousel relative">
      <button
        class="l-carousel__arow--next absolute"
        :disabled="indexCard === totalCards - 1"
        @click="next"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </button>
      <button
        class="l-carousel__arow--previous absolute"
        :disabled="indexCard === 0"
        @click="previous"
      >
        <font-awesome-icon :icon="['fas', 'angle-left']" />
      </button>
      <transition-group
        name="load"
        tag="div"
        class="l-carousel__wrapper flex mt-16"
      >
        <InformationCard
          v-for="(card, index) in cards"
          :key="`${card.id}_${index}`"
          :card="card"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'nuxt-property-decorator'
import { ICard } from '~/types/card'
import { cardsStore, searchStore } from '~/store'

@Component({
  fetchOnServer: false,
  async fetch(this: IndexPage) {
    const result = await this.$nuxt.context.$api.cards.get({
      q: `supertype:pokemon${this.query ? ' name:"' + this.query + '"' : ''}`,
      orderBy: 'name',
      page: this.page,
      pageSize: 18,
    })

    this.cards = this.isSearch ? result.data : [...this.cards, ...result.data]
    cardsStore.updateInformations({ cards: this.cards, page: this.page })
    this.totalCards = this.cards.length
  },
})
export default class IndexPage extends Vue {
  indexCard: number = 0
  isSearch: boolean = false
  firstTime: boolean = true
  page: number = cardsStore.page
  cards: ICard[] = cardsStore.cards
  totalCards: number = cardsStore.cards.length
  @Ref('observable') readonly observable!: HTMLDivElement
  @Ref('carousel') readonly carousel!: HTMLDivElement

  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting && !this.firstTime) {
        this.page++
        this.isSearch = false
        this.$fetch()
      } else if (this.firstTime) {
        this.firstTime = false
      }
    })

    observer.observe(this.observable)

    if (this.carousel) {
      const wrapper = this.carousel.querySelector(
        '.l-carousel__wrapper'
      ) as HTMLElement
      wrapper.style.transform = `translate3d(0, 0, 0)`
    }
  }

  get query() {
    return searchStore.query
  }

  @Watch('query')
  doSearch() {
    this.isSearch = true
    this.page = 1
    this.$fetch()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  @Watch('indexCard')
  loadMore() {
    this.page++
    this.isSearch = false
    this.$fetch()
  }

  next() {
    this.indexCard++
    const widthCard = this.carousel.querySelector(
      '.l-carousel__wrapper > .l-card'
    )?.clientWidth as number
    const carousel = this.carousel.querySelector(
      '.l-carousel__wrapper'
    ) as HTMLElement
    carousel.style.transform = `translate3d(-${
      this.indexCard * widthCard
    }px, 0, 0)`
  }

  previous() {
    this.indexCard--
    const widthCard = this.carousel.querySelector(
      '.l-carousel__wrapper > .l-card'
    )?.clientWidth as number
    const carousel = this.carousel.querySelector(
      '.l-carousel__wrapper'
    ) as HTMLElement
    carousel.style.transform = `translate3d(-${
      this.indexCard * widthCard
    }px, 0, 0)`
  }
}
</script>

<style lang="scss" scoped>
.l-main {
  display: none;

  @media screen and (min-width: #{map-get($breakpoints, 'sm')}) {
    grid-gap: 20px;
  }

  @media screen and (min-width: #{map-get($breakpoints, 'xl')}) {
    grid-gap: 40px;
  }

  ::v-deep .l-card.load-enter-active,
  ::v-deep .l-card.load-leave-active {
    transition: all 1s;
  }

  ::v-deep .l-card.load-enter,
  ::v-deep .l-card.load-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  &__observable {
    grid-column: span 2 / span 2;
  }
}

.l-carousel {
  height: 100%;

  @media screen and (min-width: #{map-get($breakpoints, 'md')}) {
    display: none;
  }

  &__arow--next {
    background: none;
    border: 0;
    font-size: 32px;
    left: 70px;
    margin: auto;
    outline: 0;
    right: 0;
    top: -45px;
  }

  &__arow--previous {
    background: none;
    border: 0;
    font-size: 32px;
    left: 0;
    margin: auto;
    outline: 0;
    right: 70px;
    top: -45px;
  }

  &__wrapper {
    flex-direction: row;
    height: 100%;
    transition: transform 0.5s ease 0s;
  }

  ::v-deep .l-card {
    flex: 1 0 auto;
    margin-top: 16px;
    padding: 0 17px;
    width: 90%;
  }

  ::v-deep .l-card.load-enter-active,
  ::v-deep .l-card.load-leave-active {
    transition: all 1s;
  }

  ::v-deep .l-card.load-enter,
  ::v-deep .l-card.load-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
