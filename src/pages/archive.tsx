import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { fetcher, server } from "src/config";
import { ArchiveData } from "src/types/archive";
import useSWR from "swr";

export default () => {
  let PageSize = 5;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  function useArchives(params) {
    // const [archives, _] = useState<ArchiveData>({} as ArchiveData);

    const res = useSWR(
      `/api/article/dateGroup?page=${params.currentPage}&pageSize=${
        params.PageSize
      }${router.query.date ? "&date=" + router.query.date : ""}`,
      fetcher
    );

    return res;
  }

  const { error, data: res }  = useArchives({
    PageSize,
    currentPage,
  });
  const { articleCount, data } = res || {}
  //   const colors = [
  //     "#7FBCD2",
  //     "#7FB77E",
  //     "#F94892",
  //     "#FFF9CA",
  //     "#FFB4B4",
  //     "#F37878",
  //     "#FFA1A1",
  //     "#EDD2F3",
  //   ];
  const [mounted, setMounted] = useState(false);
  let { theme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, [theme]);
  const bg = theme === "light" ? "#fdfdfd" : "#2d2d2d";

  if (!mounted) return null;
  return (
    <main className="dark:mt-2px bg-light-200 dark:bg-dark-500 py-42px px-21px">
      <section className="xl:max-w-1152px lg:max-w-960px mx-auto flex flex-col items-center -mt-10px">
        <section>
          <h1>Total {articleCount}</h1>
        </section>
        {data &&
          data.map(({ year, articles }) => (
            <div
              key={year}
              className={`p-5 mt-6 bg-light-50 dark:bg-dark-300 shadow-cardShadow rounded w-4/5 <md:w-full`}
            >
              <p className=" rounded-md w-12 h-6 flex justify-center items-center text-light-50 text-xs bg-green-500">
                {year}
              </p>

              <div className="timeline border-dashed border-l border-timeLine pt-4 pl-5">
                {articles &&
                  articles.map(
                    ({ article_id, createdAt, title, sammaryPic }, i) => (
                      <Link href={`blog?id=${article_id}`} key={article_id}>
                        <section
                          className={`flex mb-4 cursor-pointer blog-item`}
                        >
                          <img
                            src={sammaryPic}
                            alt=""
                            className="w-16 h-16 mr-3 rounded"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs text-time dark:text-grey-50">
                              {createdAt.slice(0, 10)}
                            </span>
                            <span className="text-sm cursor-pointer dark:text-slate-300 dark:hover:text-light-50 text-blogTitle hover:text-blue-500">
                              {title}
                            </span>
                          </div>

                          <style jsx>{`
                            .blog-item {
                              position: relative;
                            }
                            .blog-item::before {
                              content: "";
                              display: block;
                              position: absolute;
                              left: -26.5px;
                              top: 3px;
                              width: 12px;
                              height: 12px;
                              background: ${"#dbdbdb"};
                              border-radius: 50%;
                            }
                          `}</style>
                          <style global jsx>
                            {`
                              .blog-item:last-child::after {
                                content: "";
                                width: 2px;
                                bottom: 0;
                                background: ${bg};
                                display: block;
                                position: absolute;
                                left: -22px;
                                top: 15px;
                              }
                            `}
                          </style>
                        </section>
                      </Link>
                    )
                  )}
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};
