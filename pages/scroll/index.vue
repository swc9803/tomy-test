<template>
  <div>
    <section>1</section>
    <section>2</section>
    <section>3</section>
    <div>
      <div ref="circleRef" class="circle" />
      <svg
        ref="progressIndicatorRef"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="40"
          cy="40"
          r="39"
          stroke="#fff"
          stroke-width="2"
          :stroke-dasharray="circleLength"
          :style="{ strokeDashoffset: `${dashOffset}px` }"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
const circleRef = ref();
const progressIndicatorRef = ref();

const circleLength = ref(2 * Math.PI * 39);
const dashOffset = ref(circleLength.value);

const onMouseMove = (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  circleRef.value.style.top = `${mouseY}px`;
  circleRef.value.style.left = `${mouseX}px`;
  progressIndicatorRef.value.style.top = `${mouseY}px`;
  progressIndicatorRef.value.style.left = `${mouseX}px`;
};

const onScroll = () => {
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  dashOffset.value = circleLength.value * (1 - scrollTop / height);
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("scroll", onScroll);
});
</script>

<style lang="scss" scoped>
div {
  section {
    height: 100vh;
    &:nth-child(1) {
      background: rgb(66, 66, 66);
    }
    &:nth-child(2) {
      background: rgb(44, 44, 44);
    }
    &:nth-child(3) {
      background: rgb(22, 22, 22);
    }
  }
  .circle {
    position: fixed;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
  }
  svg {
    position: fixed;
    top: -80px;
    left: -80px;
    transform: translate(-50%, -50%);
  }
}
</style>
