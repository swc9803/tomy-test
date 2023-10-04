<template>
  <div
    class="container"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <div ref="boxRef1" class="box" />
    <div ref="boxRef2" class="box" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const boxRef1 = ref();
const boxRef2 = ref();
let clickedBox = null;
let offsetX = 0;
let offsetY = 0;

const onMouseDown = (e) => {
  if (e.target === boxRef1.value) {
    clickedBox = boxRef1.value;
  } else if (e.target === boxRef2.value) {
    clickedBox = boxRef2.value;
  } else {
    clickedBox = null;
  }

  if (clickedBox) {
    offsetX = e.pageX - clickedBox.getBoundingClientRect().left;
    offsetY = e.pageY - clickedBox.getBoundingClientRect().top;
    clickedBox.style.cursor = "grabbing";
  }
};

const onMouseUp = () => {
  if (clickedBox) {
    clickedBox.style.cursor = "grab";
    clickedBox = null;
  }
};

const onMouseMove = (e) => {
  if (clickedBox) {
    const x = e.pageX - offsetX;
    const y = e.pageY - offsetY;
    clickedBox.style.left = `${x}px`;
    clickedBox.style.top = `${y}px`;
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: rgb(223, 187, 187);
  position: relative;
  .box {
    position: absolute;
    width: 100px;
    height: 100px;
    background: blue;
    cursor: grab;
    &:nth-child(2) {
      top: 150px;
      background: red;
    }
  }
}
</style>
