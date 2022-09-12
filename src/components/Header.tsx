import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import logo from "public/images/logo.svg";
import slogo from "public/images/slogo.svg";
import darkLogo from "public/images/darkLogo.svg";
import sdarkLogo from "public/images/sdarkLogo.svg";
import { useWindowSize } from "react-use";
import { logoState } from "../stores/logo";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Link from "next/link";
function Header() {
  const router = useRouter();

  const menuList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Archives",
      path: "/archive",
    },
    {
      name: "Categories",
      path: "/category",
    },
    {
      name: "Tags",
      path: "/tag",
    },
    {
      name: "About",
      path: "/about",
    },
  ];
  const [mounted, setMounted] = useState(false);
  let { systemTheme, theme, setTheme, resolvedTheme } = useTheme();
  const { width, height } = useWindowSize();
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleColorChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <header className="min-h-60px bg-white dark:bg-headerBg flex  items-center shadow-header dark:shadow-darkheader">
      <nav className=" mx-auto w-full h-full xl:max-w-1152px lg:max-w-960px flex lg:justify-start <lg:flex-col <lg:justify-center">
        <Link href="/">
        <section className="<lg:w-full lg:w-40px flex <lg:h-60px justify-center items-center">
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
        </section>
        </Link>
        
        <section className="lg:h-60px lg:justify-between lg:flex-1  <lg:w-full <lg:flex <lg:justify-center flex  items-center <lg:h-56px lg:ml-3 <lg:ml-0">
          <ul className="flex items-center h-full ">
            {menuList.map((i) => (
              <li
                key={i.name}
                className={`hover:rounded-sm select-none  cursor-pointer text-sm ${router.route === i.path ? ` !text-black !dark:text-white`: ` text-menuText dark:text-white/60`}  px-10px py-18px hover:text-menuTextHover dark:hover:text-white/200  dark:hover:bg-transparent hover:bg-menuHoverBg` }
              >
                <Link href={`${i.path}`}>
                  <a>{i.name}</a>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hover:rounded-sm select-none flex items-center cursor-pointer text-sm text-menuText dark:text-white/60  hover:text-menuTextHover dark:hover:text-white/200  dark:hover:bg-transparent">
            {theme !== "dark" ? (
              <Icon
                onClick={handleColorChange}
                icon="material-symbols:wb-sunny-outline-rounded"
                className="w-20px h-20px"
              />
            ) : (
              <Icon
                onClick={handleColorChange}
                icon="tabler:moon"
                className="w-20px h-20px"
              />
            )}
          </div>
        </section>
      </nav>
    </header>
  );
}
export default Header;

