import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ArticelData } from "src/types/article";

import { marked } from "marked";
import Prismjs from "prismjs";
import "src/composable/prismjs";
import Image from "next/image";
import css from "src/styles/md-themes1.module.scss";
import { useTheme } from "next-themes";
import avatar from "public/images/avatar.jpg";
import { fetcher, server } from "src/config";
import useSWR from "swr";
export default () => {
  const router = useRouter();
  let { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const articleId = router.query.id || "";
  function useArticleDetail() {
    // const [articleRes, _] = useState<ArticelData>({} as ArticelData);
    const res = useSWR(`/api/article/${articleId}`, fetcher);

    return res;
  }
  const { error, data: res } = useArticleDetail();
  const { content, title, sammaryPic, createdAt } = res || { content: "" };
  useEffect(() => {
    let editor = document.querySelector("#article-md") as HTMLElement;
    if (editor) editor.innerHTML = marked(content || "");
    Prismjs.highlightAll();
  });

  useEffect(() => setMounted(true), [theme]);
  const color = theme === "light" ? "#595959" : "#c7b198";
  if (!mounted) return null;
  return (
    <main className="dark:mt-2px bg-blogLightBg dark:bg-dark-400 py-42px px-21px">
      <section className="xl:max-w-1152px lg:max-w-960px mx-auto flex flex-col items-center -mt-10px">
        <p className="text-3xl text-center p-4 text-articleTitle dark:text-nightArticleTitle">
          {title}
        </p>
        <section className="flex w-full justify-between items-center w-4/5 <md:w-full pb-4">
          <div className="left flex items-center ">
            <div className="cursor-pointer rounded-1/2 w-10 h-10 border border-light-50">
              <Image
                unoptimized
                src={avatar}
                alt="Picture of the author"
                className="rounded-1/2"
              />
            </div>

            <span className="ml-2 dark:text-light-50 text-dark-50">XGG</span>
          </div>
          <div className="right dark:text-light-50 text-base text-dark-50">
            {createdAt?.slice(0, 10)}
          </div>
        </section>
        <div className="max-h-80 overflow-hidden w-4/5 <md:w-full rounded-md">
          <img src={sammaryPic} className="w-full h-auto " alt="pic" />
        </div>

        <article
          id="article-md"
          className={`${css["markdown-body-x"]} w-4/5 <md:w-full line-numbers blog-article`}
        ></article>

        <style global jsx>
          {`
            .blog-article p {
              color: ${color} !important;
            }
            .blog-article li {
              color: ${color} !important;
            }
          `}
        </style>
      </section>
    </main>
  );
};
