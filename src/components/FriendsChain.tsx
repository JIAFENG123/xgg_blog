import Card from "./Card";

export default () => {
  const links = [
    {
      link: "baidu1",
      origin: "baidu.com",
    },
    {
      link: "baidu2",
      origin: "baidu.com",
    },
    {
      link: "baidu3",
      origin: "baidu.com",
    },
  ];
  return (
    <>
      <Card title="LINKS" >
        <ul>
          {links.map(({ link, origin }) => {
            return (
              <li key={link} className="dark:hover:bg-dark-100 hover:bg-hoverLiBg rounded cursor-pointer px-3 py-2 flex justify-between items-center">
                <span className="text-sm">{link}</span>
                <span className=" text-dark-50 rounded text-xs block h-5 flex items-center justify-center px-2 bg-hoverLiBg">
                  {origin}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
};
