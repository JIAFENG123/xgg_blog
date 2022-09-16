import { motion } from "framer-motion";
import { useRouter } from "next/router";

const MainSection = ({
  children,
  className,
}: {
  className?: string;
  children: any;
}) => {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
      className={`dark:mt-2px min-h-[calc(100vh-65px-181px)]  py-42px px-21px ${
        router.route == "/blog"
          ? "bg-blogLightBg dark:bg-dark-400"
          : "bg-mianBg dark:bg-headerBg"
      } `}
    >
      <section
        className={`xl:max-w-1152px lg:max-w-960px mx-auto flex -mt-10px ${className} text-dark-300 dark:text-light-50`}
      >
        {children}
      </section>
    </motion.main>
  );
};

export default MainSection;
