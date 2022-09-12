import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [bottomOut, setBottomOut] = useState(false);
  const [fromBottom, setFromBottom] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const offsetH =
        document.documentElement.offsetHeight -
        (window.document.documentElement.clientHeight + window.scrollY);

      if (Math.floor(offsetH) > 85) {
        setBottomOut(false);
        setFromBottom(80);
      } else {
        setFromBottom(85 - Math.floor(offsetH) + 80);
        setBottomOut(true);
      }
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, [fromBottom]);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    showTopBtn && (
      <>
        <div
          className={`upup w-16 h-10 cursor-pointer bg-light-50 flex items-center justify-center bottom-20 z-20 right-12 shadow-cardShadow rounded-md fixed  animated animate-upToTop duration-500 transition-all ${
            bottomOut ? `rounded-1/2 w-10 h-10` : `rounded-md bottom-20`
          }`}
        >
          {" "}
          <Icon
            className="w-6 h-6 text-dark-50"
            onClick={goToTop}
            icon="material-symbols:keyboard-arrow-up"
          />{" "}
        </div>
        <style jsx>
          {`
            .upup {
              bottom: ${fromBottom}px;
            }
          `}
        </style>
      </>
    )
  );
};
export default ScrollToTop;
