import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
});
const EsriMap = dynamic(() => import("./EsriMap"), {
  ssr: false,
});

export  {
  Header,
  Footer,
  EsriMap
} ;
