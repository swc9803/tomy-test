<template>
  <div v-show="!loading" class="container">
    <Swiper
      :modules="modules"
      :pagination="{
        clickable: true,
      }"
      direction="vertical"
      @swiper="onSwiper"
    >
      <!-- :direction="`vertical`" -->
      <SwiperSlide>
        <div class="wrapper">TommyFuture</div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="wrapper">TommyFuture</div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="wrapper">TommyFuture</div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="wrapper">TommyFuture</div>
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

const loading = ref(true);

const slider = ref();
const onSwiper = (swiper) => {
  slider.value = swiper;
};
onMounted(() => {
  loading.value = false;
  slider.value.slideTo(1);
});
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
