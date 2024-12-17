/*
- Example Use:
<SectionContainer externalClass="bg-fuchsia-200" innerClass="">
  <button className="absolute right-4 top-4 rounded-md bg-blue-500 px-4 py-2 text-white">
    Click me
  </button>
  <h2>Hello from Section conaitner</h2>
  <div className="flex flex-wrap gap-4">
    {Array.from({ length: 36 }, (_, index) => index).map(
      (item, index) => {
        return (
          <FilterCard key={index} img={image} text={`Filter ${item}`} />
        );
      },
    )}
  </div>
</SectionContainer>
*/

export default function SectionContainer({
  children,
  externalClass,
  innerClass,
}) {
  return (
    <section className={`relative py-6 md:py-8 lg:py-12 ${externalClass}`}>
      <div
        className={`container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 ${innerClass}`}
      >
        {children}
      </div>
    </section>
  );
}
