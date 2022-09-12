import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { fetcher, server } from "src/config";
import useSWR from "swr";
import Card from "./Card";
function useTagsGroup() {
  // const [tags, _] = useState<{ tag_id: number; count: number; name: string }[]>(
  //   []
  // );
  const res = useSWR(`/api/article/tagGroup`,
    fetcher
  );

  return res;
}
export default (props: { onTagChange }) => {
  const { onTagChange } = props;
  const {error,data:res} = useTagsGroup();
  const data = res || []
  const router = useRouter();

  return (
    <>
      <Card title="TAGS">
        <div className="flex flex-wrap">
          {data && data.map(({ tag_id, count, name }) => {
            return (
              <div
                className="flex cursor-pointer mr-3"
                key={tag_id}
                onClick={() => {
                  if (router.route === "/") {
                    onTagChange(count ? tag_id : 0);
                  } else {
                    router.push({
                      pathname: '/',
                      query: {
                        tag: tag_id
                      }
                    });
                  }
                }}
              >
                <span className="block text-light-100 bg-blue-400 flex justify-center items-center rounded-l-xl px-2 mb-2 text-xs h-5">
                  {name}
                </span>
                <span className="block dark:text-dark-50 text bg-hoverLiBg px-2 mb-2 text-xs h-5 flex justify-center items-center rounded-r-xl">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};
