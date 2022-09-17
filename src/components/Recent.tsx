import Card from "./Card";
import Image from "next/image";
import { ArticelData } from "src/types/article";
import Link from "next/link";
export default (props: { data: ArticelData[] }) => {
  const recents = (props.data && props.data.slice(0, 3)) || [];
  return (
    <>
      <Card title="RECENTS" className="mt-0">
        {recents.map(({ createdAt, title, article_id, sammaryPic }, i) => {
          return (
            <Link href={`blog?id=${article_id}`} key={article_id}>
              <article className="flex cursor-pointer max-w-full mb-3">
                {sammaryPic ? (
                  <figure className=" rounded overflow-hidden mr-4">
                    <img src={sammaryPic} className=" w-16 h-16" alt="pic" />
                  </figure>
                ) : (
                  <></>
                )}

                <section className="flex-1 flex flex-col">
                  <span className="text-xs dark:text-gray-300 text-dark-50">
                    {createdAt.slice(0, 10)}
                  </span>
                  <span className="text-sm dark:text-light-100  hover:text-blue-500 dark:hover:text-blue-300">
                    {title}
                  </span>
                </section>
              </article>
            </Link>
          );
        })}
      </Card>
    </>
  );
};
