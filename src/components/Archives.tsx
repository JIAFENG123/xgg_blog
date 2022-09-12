import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { fetcher, server } from "src/config";
import { YearGroup } from "src/types/archive";
import useSWR from "swr";

import Card from "./Card";
function useYearGroup() {
  // const [years, _] = useState<YearGroup[]>([] as YearGroup[]);
  const res = useSWR(`/api/article/yearGroup`, fetcher);

  return res;
}
export default () => {
  const { error, data: res } = useYearGroup();
  const data = res || [];
  const router = useRouter();
  return (
    <>
      <Card title="ARCHIVES">
        <ul>
          {data &&
            data.map(({ date, count }) => {
              return (
                <li
                  key={date}
                  onClick={() => {
                    router.push({
                      pathname: "/archive",
                      query: {
                        date,
                      },
                    });
                  }}
                  className="dark:hover:bg-dark-100 hover:bg-hoverLiBg rounded cursor-pointer px-3 py-2 flex justify-between items-center"
                >
                  <span className="text-sm">{date}</span>
                  <span className=" text-dark-50 rounded text-xs block h-5 flex items-center justify-center px-2 bg-hoverLiBg">
                    {count}
                  </span>
                </li>
              );
            })}
        </ul>
      </Card>
    </>
  );
};
