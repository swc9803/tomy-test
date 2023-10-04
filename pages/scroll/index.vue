<template>
  <div class="container">
    <button @click="checkPosition">check</button>
    <section ref="sectionRef">
      1
      <div ref="boxRef" class="box"></div>
    </section>
    <section ref="sectionRef2">2</section>
    <section ref="sectionRef3">3</section>
    <section ref="sectionRef4">4</section>
    <section ref="sectionRef5">5</section>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref();
const sectionRef2 = ref();
const sectionRef3 = ref();
const sectionRef4 = ref();
const sectionRef5 = ref();
const boxRef = ref();

const checkPosition = () => {
  console.log(sectionRef.value.offsetTop);
  console.log(sectionRef2.value.offsetTop);
  console.log(sectionRef3.value.offsetTop);
  console.log(sectionRef4.value.offsetTop);
  console.log(sectionRef5.value.offsetTop);
  console.log(`${sectionRef.value.clientHeight} height`);
  scrollTo({
    top: sectionRef2.value.offsetTop,
    left: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  const ani1 = gsap.timeline();
  ScrollTrigger.create({
    animation: ani1,
    trigger: sectionRef.value,
    start: "top",
    end: "bottom",
    markers: true,
    pin: true,
    scrub: 1,
  });
  ani1.to(boxRef.value, {
    rotate: 360,
  });
});
</script>

<style lang="scss" scoped>
section {
  height: 100vh;
  &:nth-child(1) {
    background: rgb(235, 214, 214);
  }
  &:nth-child(2) {
    background: rgb(165, 119, 119);
  }
  &:nth-child(3) {
    background: rgb(141, 121, 121);
  }
  &:nth-child(4) {
    background: rgb(70, 63, 63);
  }
  &:nth-child(5) {
    background: rgb(49, 45, 45);
  }
}
.box {
  width: 100px;
  height: 100px;
  background: blue;
}
button {
  position: fixed;
  top: 45%;
  right: 0;
  background: yellow;
  z-index: 5;
}
</style>
