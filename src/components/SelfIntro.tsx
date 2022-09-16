import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import Lottie from "lottie-react";
import hello from "src/libs/hello.json";
import darkhello from "src/libs/darkhello.json";

export default () => {
  const { theme } = useTheme();
  return (
    <>
      <section className="flex items-center flex-wrap">
        {theme === "dark" ? (
          <Lottie
            animationData={darkhello}
            loop={false}
            className=" w-20 h-20 <md:-mt-6"
          />
        ) : (
          <Lottie
            animationData={hello}
            loop={false}
            className=" w-20 h-20 <md:-mt-6"
          />
        )}

        <p className=" flex items-center italic flex-wrap">
          我是 <strong className="mx-2">XGG，</strong> 一个练习前端时长三年的{" "}
          <span className=" rounded bg-blue-300 px-2 text-blue-300 mx-2 hover:bg-transparent hover:text-green-300">
            小学生
          </span>
          ，喜欢
          <Icon
            icon="icon-park-outline:code-laptop"
            className="w-5 h-5 ml-2"
          ></Icon>
          、<Icon icon="fxemoji:guitar" className="w-5 h-5"></Icon>、
          <Icon icon="healthicons:exercise-running" className="w-5 h-5"></Icon>
          、<Icon icon="ph:game-controller-fill" className="w-5 h-5"></Icon>。
        </p>
        
      </section>
    </>
  );
};
