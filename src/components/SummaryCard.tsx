import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Summary } from "src/types/article";
import avatar from "public/images/avatar.jpg";
import { fetcher, server } from "src/config";
import useSWR from "swr";
export default () => {
  function useSummary() {
    // const [summary, _] = useState<Summary>({} as Summary);
    const res = useSWR(`/api/article/summaryCount`, fetcher);

    return res;
  }
  const { error, data: res } = useSummary();
  const { articleCount, tagCount, categoryCount } = res || {};
  const list = [
    {
      name: "POSTS",
      num: articleCount,
      path: "/archive",
    },
    {
      name: "CATEGORIES",
      num: categoryCount,
      path: "/category",
    },
    {
      name: "TAGS",
      num: tagCount,
      path: "/tag",
    },
  ];

  return (
    <div className="p-5  bg-light-50 dark:bg-dark-200 shadow-cardShadow rounded">
      <section className="mb-6 h-full flex flex-col items-center">
        <figure className="w-32 h-32 animated hover:animate-rotate_infinite ">
          <Image
            unoptimized
            src={avatar}
            alt="Picture of the author"
            className="cursor-pointer rounded-1/2 "
          />
        </figure>
        <span className="text-20px leading-12 dark:text-light-50 font-mono">
          XGG
        </span>
        <span className=" text-sm dark:text-light-50 font-mono">
          自律使我自由
        </span>
        <section className="flex items-center">
          <Icon icon="ep:map-location" className=" dark:text-white mr-2" />
          <span className="text-sm dark:text-light-50 font-serif">深圳</span>
        </section>
      </section>

      <ul className="flex justify-between w-full mb-4">
        {list.map(({ name, num, path }) => {
          return (
            <Link href={path} key={name}>
              <li className="flex flex-col items-center cursor-pointer">
                <span className="text-sm dark:text-light-50">{name}</span>
                <span className=" text-2xl dark:text-light-50 font-mono">
                  {num}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
      <nav className="flex justify-between w-full items-center ">
        <a href="" title="github">
          <Icon
            icon="ri:github-line"
            className=" cursor-pointer dark:text-white w-4.5 h-4.5 text-menuText dark:text-white/60  hover:text-menuTextHover dark:hover:text-white/200  dark:hover:bg-transparent"
          />
        </a>
        <a href="" title="qq">
          <Icon
            icon="ri:qq-line"
            className=" cursor-pointer dark:text-white w-4.5 h-4.5 text-menuText dark:text-white/60  hover:text-menuTextHover dark:hover:text-white/200  dark:hover:bg-transparent"
          />
        </a>
        <a href="" title="wechat">
          <Icon
            icon="ri:wechat-line"
            className=" cursor-pointer dark:text-white w-4.5 h-4.5 text-menuText dark:text-white/60  hover:text-menuTextHover dark:hover:text-white/200  dark:hover:bg-transparent"
          />
        </a>
      </nav>
    </div>
  );
};
