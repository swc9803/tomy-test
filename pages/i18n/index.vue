<template>
  <div class="container">
    <p>i18n</p>
    <h1>{{ $t("hello", { name: "vue-i18n" }) }}</h1>
    <form>
      <label for="locale-select">{{ $t("language") }}: </label>
      <select id="locale-select" v-model="$i18n.locale">
        <option value="ko">ko</option>
        <option value="en">en</option>
      </select>
    </form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  position: relative;
}
</style>
