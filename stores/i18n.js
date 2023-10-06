import { defineStore } from "pinia";

export const useLanguageStore = defineStore({
  id: "language",
  state: () => ({
    LanguageValue: "ko",
  }),
  actions: {
    changeLanguage() {
      LanguageValue = "dd";
    },
  },
});
