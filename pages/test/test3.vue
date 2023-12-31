<template>
  <div
    ref="containerRef"
    class="container"
    @mouseup="onActive = false"
    @mouseleave="onActive = false"
    @touchcancel="onActive = false"
    @touchend="onActive = false"
    @mousemove="onMouseMove"
    @touchmove="onTouchMove"
  >
    <div class="beforeWrapper">
      <img
        src="https://farm2.staticflickr.com/1638/26145024230_06acd55d1b_b.jpg"
      />
    </div>
    <div ref="afterWrapperRef" class="afterWrapper">
      <img
        src="https://farm2.staticflickr.com/1663/25814974803_d4c55ff708_b.jpg"
      />
    </div>
    <div
      ref="scrollerRef"
      class="scroller"
      @mousedown="onActive = true"
      @touchstart="onActive = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <polygon points="0 50 37 68 37 32 0 50" fill="#ffffff" />
        <polygon points="100 50 64 32 64 68 100 50" fill="#ffffff" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const containerRef = ref();
const scrollerRef = ref();
const afterWrapperRef = ref();

const onActive = ref(false);
const afterSize = ref(0);
const mouseX = ref(0);

const moveScroller = (x) => {
  afterSize.value = Math.max(0, Math.min(x, containerRef.value.offsetWidth));
  afterWrapperRef.value.style.width = `${afterSize.value}px`;
  scrollerRef.value.style.left = `${afterSize.value - 25}px`;
};

const onMouseMove = (e) => {
  if (onActive.value) {
    mouseX.value = e.pageX - containerRef.value.getBoundingClientRect().left;
    moveScroller(mouseX.value);
  }
};
const onTouchMove = (e) => {
  if (onActive.value) {
    mouseX.value =
      e.touches[0].pageX - containerRef.value.getBoundingClientRect().left;
    moveScroller(mouseX.value);
  }
};

onMounted(() => {
  moveScroller(containerRef.value.offsetWidth / 2);
});
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 600px;
  border-radius: 16px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.2),
    0 6px 6px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  .beforeWrapper,
  .afterWrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .scroller {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 50px;
    height: 50px;
    border: 5px solid white;
    border-radius: 50%;
    background: transparent;
    opacity: 0.8;
    pointer-events: auto;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      width: 6px;
      height: calc(var(--vh) * 100);
      margin-left: -3.5px;
      background: white;
    }
    &::before {
      top: 100%;
    }
    &::after {
      bottom: 100%;
    }
    &:hover {
      opacity: 1;
    }
    svg {
      width: 100%;
      height: 100%;
      padding: 5px;
    }
  }
}
</style>
