<template>
  <transition-group
    name="load"
    tag="section"
    class="l-main grid grid-columns-1 pa-4 xl:grid-columns-2 xl:px-6 xl:py-8"
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
  },
})
export default class IndexPage extends Vue {
  isSearch: boolean = false
  firstTime: boolean = true
  page: number = cardsStore.page
  cards: ICard[] = cardsStore.cards
  @Ref('observable') readonly observable!: HTMLDivElement

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
}
</script>

<style lang="scss" scoped>
.l-main {
  grid-gap: 20px;

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
</style>
