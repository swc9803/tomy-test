<template>
  <div class="container">
    <p>test</p>
    <div v-for="item in lists" :key="item.id" class="wrapper">
      <p>이름: {{ item.name }}</p>
      <p>전화번호: {{ item.main_contact }}</p>
    </div>
    <button @click="pushItem">show item</button>
  </div>
</template>

<script setup>
import axios from "axios";

const lists = reactive([]);

const fetchData = async () => {
  try {
    const response = await axios.get("/api/api/v1/branch");
    lists.push(...response.data.LIST);
  } catch (error) {
    console.log(`error ${error}`);
  }
};

const pushItem = () => {
  lists.push({ name: "가나가", main_contact: "02)000-0000" });
};

onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  .wrapper {
    display: grid;
    grid-template-columns: 120px auto;
    gap: 20px;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
  }
}
</style>
