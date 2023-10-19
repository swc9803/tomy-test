<template>
  <NuxtLayout>
    <nav>
      <nuxt-link to="/">home</nuxt-link>
      <nuxt-link to="/spider">spider</nuxt-link>
      <nuxt-link to="/drag">drag</nuxt-link>
      <nuxt-link to="/ring">ring</nuxt-link>
      <nuxt-link to="/i18n">i18n</nuxt-link>
      <nuxt-link to="/scroll">scroll</nuxt-link>
      <nuxt-link to="/spot">spot</nuxt-link>
      <nuxt-link to="/swiper">swiper</nuxt-link>
    </nav>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss">
.router-link-exact-active {
  background: yellow;
}
nav {
  position: absolute;
  display: flex;
  gap: 20px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>
