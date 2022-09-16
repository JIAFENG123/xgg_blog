import Archives from "@/components/Archives";
import ArcticleList from "@/components/ArcticleList";
import Categories from "@/components/Categories";
import FriendsChain from "@/components/FriendsChain";
import Pagination from "@/components/Pagination";
import Recent from "@/components/Recent";
import SummaryCard from "@/components/SummaryCard";
import Tags from "@/components/Tags";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { useCateData } from "src/composable/useCateData";
import { fetcher, server } from "src/config";
import useSWR from "swr";

import { ArticleRes, Cate, CategoryGroup } from "src/types/article";
import MainSection from "./MainSection";
const MainLeft = (props) => {
  const { categories, data, setCate, setTag } = props;
  return (
    <div className="p-10px <md:hidden @md:w-1/3 @lg:w-1/3 xl:w-1/4 ">
      <SummaryCard />
      {/* <FriendsChain /> */}
      <Categories data={categories} onCateChange={(cate) => setCate(cate)} />
      <div className="hidden @md:block @lg:block mt-6">
        <Recent data={data} />
        <Archives />
        <Tags onTagChange={(tag) => setTag(tag)} />
      </div>
    </div>
  );
};

const Main = () => {
  let PageSize = 5;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [cate, setCate] = useState(0);
  const [tag, setTag] = useState(0);
  const [mounted, setMounted] = useState(false);
  function useArticles(params) {
    // const [articleRes, _] = useState<ArticleRes>({} as ArticleRes);
    const res = useSWR(
      `/api/article?page=${params.currentPage}&pageSize=${params.PageSize}${
        params.cate ? "&cate=" + params.cate : ""
      }${params.tag ? "&tag=" + params.tag : ""}`,
      fetcher
    );

    // _(data);

    // return articleRes;
    return res;
  }

  useEffect(() => {
    setMounted(true);
    if (router.query.tag) {
      setTag(+router.query.tag);
    }
    if (router.query.cate) {
      setCate(+router.query.cate);
    }
    if (!router.query.tag) setTag(0);
    if (!router.query.cate) setCate(0);
  }, [router.query.tag, router.query.cate]);

  const { error, data: res } = useArticles({
    PageSize,
    currentPage,
    cate,
    tag,
  });

  const { data, count } = res || {};
  const { categories } = useCateData();

  if (!mounted) return null;
  return (
    <MainSection>
      <MainLeft
        categories={categories}
        data={data}
        setCate={setCate}
        setTag={setTag}
      />
      <div className="p-10px <md:w-full @md:w-2/3 @lg:w-2/3 xl:w-2/4">
        <ArcticleList data={data} />
        <Pagination
          currentPage={currentPage}
          totalCount={count}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <div className="hidden <md:block mt-6">
          <SummaryCard />
          {/* <FriendsChain /> */}
          <Categories
            data={categories}
            onCateChange={(cate) => setCate(cate)}
          />
          <Recent data={data} />
          <Archives />
          <Tags onTagChange={(tag) => setTag(tag)} />
        </div>
      </div>
      <div className="p-10px <md:hidden @md:hidden @lg:hidden xl:w-1/4 ">
        <Recent data={data} />
        <Archives />
        <Tags onTagChange={(tag) => setTag(tag)} />
      </div>
    </MainSection>
  );
};
export default Main;
