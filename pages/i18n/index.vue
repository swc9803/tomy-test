<template>
  <div class="container">
    <p>i18n</p>
    <h1>{{ $t("hello", { name: "user-name" }) }}</h1>
    <form>
      <label for="locale-select">{{ $t("language") }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="ko">ko</option>
        <option value="en">en</option>
      </select>
    </form>
    <button @click="changeLanguage('en')">en</button>
    <button @click="changeLanguage('ko')">ko</button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const changeLanguage = (lan) => {
  locale.value = lan;
  localStorage.setItem("language", lan);
};

onMounted(() => {
  locale.value = localStorage.getItem("language");
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
</style>
