<template>
  <transition-group name="load" tag="div" class="l-main grid grid-gap grid-columns-2 pa-4">
    <InformationCard v-for="(card, index) in cards" :key="`${card.id}_${index}`" :card="card" />
    <div ref="observable" class="l-main__observable" :key="'OBSERVABLE_DIV'">
      <p v-if="$fetchState.pending" class="text-center my-6">Loading...</p>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { ICard } from '~/types/card'
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  async fetch (this: IndexPage) {
    const result = await this.$nuxt.context.$api.cards.get({ q: 'supertype:pokemon', orderBy: 'name', page: this.page, pageSize: 18 })
    this.cards = [...this.cards, ...result.data]
  }
})
export default class IndexPage extends Vue {
  cards: ICard[] = []
  page: number = 1
  firstTime: boolean = true

  mounted() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting && !this.firstTime) {
        this.page++
        this.$fetch()
      } else if (this.firstTime) {
        this.firstTime = false
      }
    })

    observer.observe(this.$refs.observable as Element)
  }
}
</script>

<style lang="scss" scoped>
.l-main {
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