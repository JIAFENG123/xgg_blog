import {
  useSetRecoilState,
  useRecoilValue,
  atom,
  useRecoilState,
  selector,
} from "recoil";
import logo from "public/images/logo.svg";
import slogo from "public/images/slogo.svg";
import darkLogo from "public/images/darkLogo.svg";
import sdarkLogo from "public/images/sdarkLogo.svg";
let isDark = () => false;
let judgeWidth = true;
if (typeof window !== "undefined") {
  isDark = () => document.documentElement.classList.contains("dark");

  judgeWidth =
    (document.documentElement.clientWidth &&
    document.documentElement.clientWidth >= 1024) as boolean;
}

export const logoState = atom({
  key: "logoState", // unique ID (with respect to other atoms/selectors)
  default: !isDark()
    ? judgeWidth
      ? slogo
      : logo
    : judgeWidth
    ? sdarkLogo
    : darkLogo, // default value (aka initial value)
});

export const getLogoState = selector({
  key: "getLogoState",
  get: ({ get }) => {
    const logo = get(logoState);
    return logo;
  },
});
