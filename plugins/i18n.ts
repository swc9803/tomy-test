import { createI18n } from "vue-i18n";
import ko from "../locales/ko.json";
import en from "../locales/en.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "ko",
    messages: {
      ko,
      en,
    },
  });
  vueApp.use(i18n);
});
