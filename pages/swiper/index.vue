<template>
  <div class="container">
    <Swiper
      :modules="modules"
      :pagination="{
        clickable: true,
      }"
      :direction="'vertical'"
    >
      <SwiperSlide v-for="(section, index) in sections" :key="section.id">
        <div class="wrapper">
          {{ index }}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Pagination];

const sections = [
  { title: "title1" },
  { title: "title2" },
  { title: "title3" },
  { title: "title4" },
];
</script>

<style lang="scss" scoped>
.container {
  // width: 100%;
  height: calc(var(--vh) * 100);
  // height: 100%;
  .swiper {
    height: 100%;
  }
  .wrapper {
    height: 100%;
    background: rgb(204, 184, 184);
  }
}
</style>
