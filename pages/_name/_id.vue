<template>
  <section
    v-if="!!card"
    class="
      l-section
      grid grid-columns-1
      align-items-center
      pa-6
      xl:grid-columns-2
    "
  >
    <div class="l-section__image md:flex md:mb-6">
      <LinkButton
        class="l-section__link mb-4 md:mb-6"
        text="Go Back"
        :to="localePath('/')"
      />
      <img :src="card.images.large" :alt="card.name" />
    </div>
    <div class="px-6">
      <header v-if="!!card" class="l-header pb-4 mb-4">
        <h1 class="l-header__title">
          {{ card.name }}
        </h1>
        <span>{{ card.id }}</span>
        <br />
        <span v-for="(type, index) in card.types" :key="type">
          {{ type }}
          <span v-if="index != card.types.length - 1"> / </span>
        </span>
      </header>
      <div>
        <div>
          <h3>Attacks:</h3>
          <div v-for="(attack, index) in card.attacks" :key="index">
            <span
              class="l-attack"
              @click="openModal(`attack_modal_${index}`)"
              >{{ attack.name }}</span
            >
            <br
              v-if="card.resistances && index != card.resistances.length - 1"
            />
            <ModalAttack :id="`attack_modal_${index}`" class="text-center">
              <h4 class="mb-6">
                {{ attack.name }}
              </h4>
              <span v-for="(cost, indexCost) in attack.cost" :key="indexCost">
                {{ cost }}
                <span v-if="index !== attack.cost.length - 1">/</span>
              </span>
              <br /><br />
              <span>{{ attack.damage }}</span>
              <p v-if="attack.text" class="text-justify my-16">
                {{ attack.text }}
              </p>
            </ModalAttack>
          </div>
          <span v-if="card.resistances && card.resistances.length === 0"
            >N/A</span
          >
        </div>
        <div v-if="!!card.resistances" class="mt-4">
          <h3>Resistance:</h3>
          <div v-for="(resistance, index) in card.resistances" :key="index">
            {{ resistance.type }} / {{ resistance.value }}
            <br
              v-if="card.resistances && index != card.resistances.length - 1"
            />
          </div>
          <span v-if="card.resistances && card.resistances.length === 0"
            >N/A</span
          >
        </div>
        <div v-if="!!card.weaknesses" class="mt-4">
          <h3>Weaknesses:</h3>
          <div v-for="(weaknesse, index) in card.weaknesses" :key="index">
            {{ weaknesse.type }} / {{ weaknesse.value }}
            <br v-if="card.weaknesse && index != card.weaknesse.length - 1" />
          </div>
          <span v-if="card.weaknesses && card.weaknesses.length === 0"
            >N/A</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import slugify from 'slugify'
import { Component, Vue } from 'nuxt-property-decorator'
import { ICard } from '~/types/card'
import { cardsStore, modalStore } from '~/store'

@Component
export default class IdPage extends Vue {
  card: ICard | null = null

  mounted() {
    this.card =
      cardsStore.cards.find(
        (card) =>
          slugify(card.name.toLowerCase()) === this.$route.params.name &&
          card.id === this.$route.params.id
      ) || null

    if (this.card === null) {
      this.$router.push('/')
    }
  }

  openModal(idModal: string) {
    modalStore.setVisible()
    modalStore.setId(idModal)
  }
}
</script>

<style lang="scss" scoped>
.l-header {
  border-bottom: 2px solid #554198;

  &__title {
    font-size: 32px;
  }
}

.l-section {
  &__image {
    @media screen and (min-width: #{map-get($breakpoints, 'md')}) {
      flex-direction: column;
    }
  }

  &__image img {
    max-width: 100%;
  }

  &__link {
    @media screen and (min-width: #{map-get($breakpoints, 'md')}) {
      align-self: flex-start;
    }
  }
}

.l-attack {
  cursor: pointer;
}
</style>
