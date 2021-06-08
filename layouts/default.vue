<template>
  <section
    class="
      relative
      grid grid-rows-auto grid-columns-1
      xl:grid-rows-1 xl:grid-columns-2
    "
  >
    <TheHeader />
    <Nuxt />
  </section>
</template>

<style lang="scss" scoped>
section {
  height: 100vh;
  overflow: hidden;

  @media screen and (min-width: #{map-get($breakpoints, 'sm')}) {
    max-height: initial;
    overflow: auto;
  }
}
</style>
