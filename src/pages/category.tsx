import Categories from "@/components/Categories";
import MainSection from "@/layouts/MainSection";
import { useCateData } from "src/composable/useCateData";

export default () => {
  const { categories } = useCateData();
  return (
    <MainSection className="flex-col items-center flex">
      <section className="w-4/5 <md:w-full">
        <Categories data={categories} onCateChange={null} />
      </section>
    </MainSection>
  );
};
