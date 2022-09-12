
import Tags from "@/components/Tags";

export default () => {
  return (
    <main className="dark:mt-2px bg-light-200 dark:bg-dark-500 py-42px px-21px">
      <section className="xl:max-w-1152px lg:max-w-960px mx-auto flex flex-col items-center -mt-10px">
        <section className="w-4/5 <md:w-full">
          <Tags onTagChange={null}/>
        </section>
      </section>
    </main>
  );
};
