<template>
  <div v-if="card.id" class="l-card grid grid-columns-2">
    <div class="l-card__image">
      <nuxt-link
        :to="
          localePath({
            path: `/${slugify(card.name.toLowerCase())}/${card.id}`,
          })
        "
      >
        <img :src="principalImage" :alt="card.name" />
      </nuxt-link>
    </div>
    <div class="l-card__text text-center flex justify-space-between pa-4">
      <div class="l-card__content flex justify-space-between">
        <div>
          <h3>{{ card.name }}</h3>
          <p class="l-card__content__id mt-1">
            {{ card.id }}
          </p>
        </div>
        <div>
          <span class="l-card__content__types">Types:</span>
          <span v-for="(type, index) in card.types" :key="type">
            {{ type }}
            <span v-if="index != card.types.length - 1"> / </span>
          </span>
        </div>
      </div>
      <div class="l-card__action">
        <LinkButton
          text="Details"
          :to="
            localePath({
              path: `/${slugify(card.name.toLowerCase())}/${card.id}`,
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import slugify from 'slugify'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ICard } from '~/types/card'

@Component
export default class InformationCard extends Vue {
  slugify: Function = slugify
  @Prop({ type: Object, required: true }) readonly card!: ICard

  get principalImage(): string {
    return this.card.images.small
  }
}
</script>

<style lang="scss" scoped>
.l-card {
  grid-column: 1 / -1;
  grid-gap: 28px;
  max-height: 50%;

  @media screen and (min-width: #{map-get($breakpoints, 'xl')}) {
    grid-column: auto;
  }

  &__image img {
    border-radius: 8px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
    max-width: 100%;
  }

  &__image img:hover {
    transform: scale(1.25);
  }

  &__text {
    border-radius: 8px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    flex-direction: column;
  }

  &__content {
    flex-direction: column;
    height: 60%;
  }

  &__content h3 {
    font-family: $text-font;
    letter-spacing: 0.125em;
  }

  &__content__id {
    font-family: $text-font;
    font-size: 13px;
    font-weight: 100;
  }

  &__content__types {
    display: block;
    font-family: $text-font;
    font-weight: 700;
  }

  &__action__button {
    background-color: #554198;
    border-radius: 4px;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
      0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    color: #fff;
    display: inline-block;
    font-family: $title-font;
    letter-spacing: 0.125rem;
    text-transform: uppercase;
  }
}
</style>
