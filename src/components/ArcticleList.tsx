import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticelData, ArticleRes } from "src/types/article";

export default (props: { data: ArticelData[] }) => {
  if (!props.data) return;
  return (
    <>
      {props.data.map(({ title, summary, article_id, sammaryPic }, i) => {
        
        return (
          <Link href={`blog?id=${article_id}`} key={article_id}>
            <div className=" rounded-md bg-light-100 dark:bg-dark-50 shadow-cardShadow mb-6 cursor-pointer">
              {sammaryPic ? (
                <figure className="w-full max-h-271px overflow-hidden">
                  <img
                    src={sammaryPic}
                    // src={`https://picsum.photos/651/271?random=${i+1}`}
                    alt="random"
                    className="rounded-t-md w-full h-auto"
                  />
                </figure>
              ) : (
                <></>
              )}

              <article className="p-5">
                <p className="text-xs mb-2 dark:text-gray-300 text-gray-500">
                  <span className="mr-3">POSTED 2 YEARS AGO</span>
                  <span>3 MINUTES READ (ABOUT 464 WORDS)</span>
                </p>
                <h1 className="text-2xl mb-6 dark:text-light-50 cursor-pointer hover:text-blue-500 dark:hover:text-blue-300">
                  {title}
                </h1>
                <p className=" mb-6 break-words dark:text-light-100">
                  {summary}
                  {/* Welcome to the Icarus documentation site! Icarus is a simple,
                delicate, and modern theme for the static site generator Hexo.
                It strives to be elegant in design while simple and
                straightforward to use. Its versatile and flexible configuration
                system enables power users lay out their sites to the finest
                details. Icarus also offers a wide range of plugins and widgets
                to meet your various customization and optimization needs.
                Moreover, its refreshed implementation enables better IDE
                support and third-party integration, which open to a sea of
                improvement possibilities. */}
                </p>
                <Link href={`blog?id=${article_id}`}>
                  <a className="text-sm dark:text-gray-500  text-dark-100 rounded hover:bg-readMoreHover px-3 py-1 bg-hoverLiBg">
                    Read More
                  </a>
                </Link>
              </article>
            </div>
          </Link>
        );
      })}
    </>
  );
};
