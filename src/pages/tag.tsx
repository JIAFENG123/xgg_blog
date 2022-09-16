import Tags from "@/components/Tags";
import MainSection from "@/layouts/MainSection";

export default () => {
  return (
    <MainSection className="flex-col items-center flex">
      <section className="w-4/5 <md:w-full">
        <Tags onTagChange={null} />
      </section>
    </MainSection>
  );
};
