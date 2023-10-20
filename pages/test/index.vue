<template>
  <div class="container">
    <div class="text-container">
      <div
        v-for="item in texts"
        :key="item.id"
        :ref="textRef"
        class="text-wrapper"
      >
        <!-- :style="{ background: item.color }" -->
        <div :style="{ background: item.color }">
          <p>
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";

const texts = [
  { text: "w", color: "#ff6d6a" },
  { text: "e", color: "#efbe7d" },
  { text: "l", color: "#e9ec6b" },
  { text: "c", color: "#77dd77" },
  { text: "o", color: "#8bd3e6" },
  { text: "m", color: "#b1a2ca" },
  { text: "e", color: "#ffbdda" },
];
const textArray = ref([]);
const textRef = (el) => textArray.value.push(el);
const textFallingAni = gsap.timeline();

onMounted(() => {
  textFallingAni.fromTo(
    textArray.value,
    {
      y: "-60vh",
      opacity: 1,
    },
    {
      y: 0,
      opacity: 0,
      stagger: 0.3,
      duration: 0.5,
      ease: "none",
    },
    "<",
  );
});
</script>

<style lang="scss" scoped>
.container {
  height: calc(var(--vh) * 100);
  .text-container {
    display: flex;
    justify-content: center;
    gap: 2em;
    width: 100%;
    height: 100%;
    .text-wrapper {
      display: flex;
      align-items: center;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 3em;
        height: 3em;
        p {
          font-size: 1.5em;
          font-weight: 900;
          // opacity: 0;
        }
      }
    }
  }
}
</style>
