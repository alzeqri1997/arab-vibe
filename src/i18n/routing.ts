import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localeCookie: {
    // Custom cookie name
    name: 'USER_LOCALE',
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365
  }
});
