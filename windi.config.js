import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class",
  extract: {
    include: ["**/*.{jsx,tsx,css}"],
    exclude: ["node_modules", ".git", ".next"],
  },
  theme: {
    boxShadow: {
      header: "0 4px 10px rgb(0 0 0 / 5%)",
      darkheader: "0 1px 1px rgb(255 255 255 / 30%)",
      cardShadow: "0 4px 10px rgb(0 0 0 / 5%), 0 0 1px rgb(0 0 0 / 10%)",
    },
    textColor: (theme) => ({
      ...theme("colors"),
      menuText: "#4a4a4a",
      menuTextHover: "#3273DC",
      menuTxtDark: "#F7F5F2",
      time: "#7a7a7a",
      blogTitle: "#363636",
      articleTitle: '#595959',
      nightArticleTitle: '#FCF8E8'

    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      menuHoverBg: "#FAFAFA",
      headerBg: "#1B1A17",
      mianBg: "#F0F0F0",
      hoverLiBg: "#f5f5f5",
      readMoreHover: "#eee",
      blogLightBg: "#F0ECE3",
    }),

    borderColor: (theme) => ({
      ...theme("colors"),
      timeLine: "#dbdbdb",
    }),
    // from {
    //   transformOrigin: center;
    //   -webkit-transform: rotate3d(0, 0, 1, -200deg);
    //   transform: rotate3d(0, 0, 1, -200deg);
    //   opacity: 0;
    // }
    // to {
    //   transformOrigin: center;
    //   -webkit-transform: translate3d(0, 0, 0);
    //   transform: translate3d(0, 0, 0);
    //   opacity: 1;
    // }
    animation: {
      rotate_infinite: "toy 1s linear infinite",
      upToTop: "totop 3s ease-in-out infinite",
    },
    keyframes: {
      toy: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "50%": {
          transform: "rotate(180deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      totop: {
        "0%": {
          transform: "translateY(0px)",
        },
        "25%": {
          transform: "translateY(10px)",
        },
        "50%": {
          transform: "translateY(0px)",
        },
        "75%": {
          transform: "translateY(-10px)",
        },
        "100%": {
          transform: " translateY(0px)",
        },
      },
    },
  },
  plugins: [
    // Other plugins
    require("@windicss/plugin-animations")({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
});
