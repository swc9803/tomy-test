<template>
  <div>
    <section>section1</section>
    <section>section2</section>
    <section>section3</section>
    <div>
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

      <div ref="circleRef" class="cursor">
        <div ref="waveRef" class="wave" />
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";

const circleRef = ref();
const waveRef = ref();
const progressIndicatorRef = ref();

const circleLength = ref(2 * Math.PI * 39);
const dashOffset = ref(circleLength.value);

const onMouseMove = (e) => {
  circleRef.value.style.top = `${e.clientY}px`;
  circleRef.value.style.left = `${e.clientX}px`;
  progressIndicatorRef.value.style.top = `${e.clientY}px`;
  progressIndicatorRef.value.style.left = `${e.clientX}px`;
};

const onScroll = () => {
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  waveRef.value.style.top = `${100 - (scrollTop / height) * 100}%`;
  gsap.to(dashOffset, {
    value: circleLength.value * (1 - scrollTop / height),
    duration: 0.3,
    ease: "power1.inout",
  });
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
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4em;
    color: white;
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

  .cursor {
    position: fixed;
    width: 60px;
    height: 60px;
    transform: translate(-50%, -50%);
    border: 2px solid #ffffff;
    border-radius: 50%;
    overflow: hidden;
    .wave {
      position: absolute;
      top: 100%;
      left: -50%;
      width: 200%;
      height: 200%;
      border-radius: 38%;
      background: rgb(187, 187, 187);
      transition: all 0.3s ease;
      animation: wave 4s linear infinite;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 38%;
        animation: wave 2s linear infinite reverse;
      }
    }
    @keyframes wave {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  svg {
    position: fixed;
    top: -80px;
    left: -80px;
    transform: translate(-50%, -50%) rotate(-90deg);
  }
}
</style>
