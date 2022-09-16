import Image from "next/image";
import { Icon } from "@iconify/react";
import logo from "public/images/logo.svg";
import slogo from "public/images/slogo.svg";
import darkLogo from "public/images/darkLogo.svg";
import sdarkLogo from "public/images/sdarkLogo.svg";
import { useTheme } from "next-themes";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const [poem, _] = useState({} as { content: string });
  const { width } = useWindowSize();
  useEffect(() => {
    fetch(`https://v1.jinrishici.com/all.json`)
      .then((res) => res.json())
      .then((data) => {
        _(data as unknown as { content: string });
      });
  }, [router.route]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <footer className="py-42px px-21px bg-white/50 dark:bg-headerBg">
      <div className="xl:max-w-1152px lg:max-w-960px mx-auto flex items-center justify-between ">
        <section>
          <Image
            unoptimized
            src={
              resolvedTheme !== "dark"
                ? width && width >= 1024
                  ? slogo
                  : logo
                : width && width >= 1024
                ? sdarkLogo
                : darkLogo
            }
            alt="Picture of the author"
            className="cursor-pointer"
          />

          <p className="text-xs font-sans dark:text-white">
            <span className="font-mono">{poem.content}</span>
            <br></br>
            <span>© 2022</span>&nbsp;&nbsp;Powered by XGG
          </p>
        </section>
        <a
          href="https://github.com/JIAFENG123"
          target="_Blank"
          title="github"
          className="cursor-pointer"
        >
          <Icon icon="ion:logo-github" className=" w-7 h-7 dark:text-white" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
