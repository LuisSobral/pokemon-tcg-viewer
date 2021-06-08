<template>
  <div :id="id" class="l-modal l-modal--hidden" @click="close">
    <div class="l-modal__content fixed">
      <div class="l-modal__body absolute pa-14 ma-auto">
        <slot />
      </div>
    </div>
    <div class="l-modal__background fixed" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { modalStore } from '~/store'

@Component
export default class IdPage extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string

  get isVisible() {
    return modalStore.visible
  }

  get idModal() {
    return modalStore.id
  }

  @Watch('isVisible')
  insertModal() {
    if (this.isVisible && this.$el.id === this.idModal) {
      this.$el.classList.remove('l-modal--hidden')
    }
  }

  close(event: { target: HTMLElement }) {
    const clickInside: boolean =
      event.target.classList.contains('l-modal__body')

    if (!clickInside) {
      modalStore.setInvisible()
      this.$el.classList.add('l-modal--hidden')
    }
  }
}
</script>

<style lang="scss" scoped>
.l-modal {
  &--hidden {
    visibility: hidden;
  }

  &__content {
    bottom: 0;
    left: 0;
    overflow: auto;
    right: 0;
    top: 0;
    z-index: 1000;
  }

  &__body {
    background-color: #fff;
    border-radius: 0.3rem;
    bottom: 0;
    height: 40%;
    left: 0;
    right: 0;
    top: 0;
    width: 60%;

    @media screen and (min-width: #{map-get($breakpoints, 'xl')}) {
      height: 30%;
      width: 20%;
    }
  }

  &__background {
    background-color: #000;
    bottom: 0;
    left: 0;
    opacity: 0.75;
    right: 0;
    top: 0;
    z-index: 900;
  }
}
</style>
