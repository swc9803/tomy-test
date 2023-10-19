<template>
  <div>
    <svg
      width="250"
      height="250"
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="125"
        cy="125"
        r="124"
        stroke="#000"
        stroke-width="2"
        :stroke-dasharray="circleLength"
        :style="{ strokeDashoffset: `${dashOffset}px` }"
      />
    </svg>
  </div>
</template>

<script setup>
const circleLength = ref(785); // 2 파이 r(124)
const dashOffset = ref(circleLength.value);

const onScroll = () => {
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrolled = (scrollTop / height) * 100;

  dashOffset.value = circleLength.value * (1 - scrolled / 100);
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style lang="scss" scoped>
div {
  height: 200vh;
  svg {
    position: fixed;
    top: 0;
  }
}
</style>
