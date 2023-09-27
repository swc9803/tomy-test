import { defineStore } from "pinia";

export const useCountStore = defineStore({
  id: "Count",
  state: () => ({
    CountData: null,
  }),
});
