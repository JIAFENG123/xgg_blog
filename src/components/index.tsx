import dynamic from "next/dynamic";
import { ComponentType } from "react";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
});
export  {
  Header,
  Footer
} ;
