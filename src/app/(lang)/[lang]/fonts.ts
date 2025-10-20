import localFont from "next/font/local";

export const notoSansArabic = localFont({
  src: [
    {
      path: "../../../../public/fonts/Noto_Sans_Arabic_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Noto_Sans_Arabic_Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});
