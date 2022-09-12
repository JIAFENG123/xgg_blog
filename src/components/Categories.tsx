import { useRouter } from "next/router";
import { Cate } from "src/types/article";
import Card from "./Card";

export default (props: { data: Cate[]; onCateChange }) => {
  const { data, onCateChange } = props;
  const router = useRouter();
  function renderCates(cates: Cate[]) {
    if (cates && cates.length) {
      return cates.map(({ id, name, children, count }, i) => {
        return (
          <li key={id}>
            <a
              className="dark:hover:bg-dark-100 hover:bg-hoverLiBg rounded cursor-pointer px-3 py-2 flex justify-between items-center"
              onClick={() => {
                if (router.route === "/") {
                  onCateChange(count ? id : 0);
                } else {
                  router.push({
                    pathname: "/",
                    query: {
                      cate: id,
                    },
                  });
                }
              }}
            >
              <span className="text-sm">{name}</span>
              <span className=" text-dark-50 rounded text-xs block h-5 flex items-center justify-center px-2 bg-hoverLiBg">
                {count || 0}
              </span>
            </a>

            {children && children.length ? (
              <ul className="m-3 mr-0 pl-3 border-l border-timeLine">
                {renderCates(children)}
              </ul>
            ) : (
              <></>
            )}
          </li>
        );
      });
    }
  }
  return (
    <>
      <Card title="CATEGORIES" className="mb-6">
        <ul>{renderCates(data)}</ul>
      </Card>
    </>
  );
};
