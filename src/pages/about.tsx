import Card from "@/components/Card";
import SelfIntro from "@/components/SelfIntro";
import MainSection from "@/layouts/MainSection";
import { useEffect } from "react";
import TypeIt from "typeit";

import { EsriMap } from "../components";
import avatar from "public/images/avatar.jpg";
import Image from "next/image";

function About() {
  useEffect(() => {
    // new TypeIt(".skills", {
    //   strings: [
    //     "This is a great string.",
    //     "But here is a better one.",
    //     "This is a great string.",
    //     "But here is a better one.",
    //     "This is a great string.",
    //     "But here is a better one.",
    //     "This is a great string.",
    //     "But here is a better one.",
    //     "This is a great string.",
    //     "But here is a better one.",
    //   ],
    //   speed: 50,
    //   waitUntilVisible: true,
    // }).go();
  });

  return (
    <MainSection className=" justify-center">
      <section className="w-4/5 <md:w-full bg rounded">
        <Card title="" className="bg-transparent dark:bg-opacity-75 mt-0">
          <h2 className="text-center text-lg mb-4 font-bold font-mono">
            About me
          </h2>
          <figure className="w-32 mx-auto h-32 animated hover:animate-rotate_infinite overflow-hidden rounded-1/2 border border-2 border-blue-300 ">
            <Image
              unoptimized
              src={avatar}
              alt="Picture of the author"
              className="cursor-pointer "
            />
          </figure>
          <SelfIntro />
          <div className="<md:hidden mt-3">
            <EsriMap />
          </div>

          {/* 
           ...wait to complete
          */}
          {/* <section className="skills text-lg"></section> */}
        </Card>
      </section>
      <style jsx>{`
        .bg {
          background-color: white;
          background-image: url("https://xgg-pic.oss-cn-shenzhen.aliyuncs.com/imgs/snow.gif");
          background-size: 100% auto;
        }
      `}</style>
    </MainSection>
  );
}
export default About;
