<template>
  <nuxt-link class="py-2 px-4" :to="to">
    {{ text }}
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class LinkButton extends Vue {
  @Prop({ type: String, required: true }) readonly text!: string
  @Prop({ type: [String, Object], required: true }) readonly to!:
    | string
    | object
}
</script>

<style lang="scss" scoped>
a {
  background-color: #554198;
  border-radius: 4px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  color: #fff;
  display: inline-block;
  font-family: $title-font;
  letter-spacing: 0.125rem;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
