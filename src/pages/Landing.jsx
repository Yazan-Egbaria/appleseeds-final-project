import SectionContainer from "../components/layout/SectionContainer";

const Landing = () => {
  return (
    <div className="h-full">
      <SectionContainer
        externalClass="bg-gradient-to-r from-fuchsia-100 to-amber-100"
        innerClass="flex flex-col gap-4"
      >
        {/* Hey all, That just some dummy content to demonstrate the Section Container and its use */}
        <h1 className="text-3xl font-bold">Landing Page</h1>
        <h2 className="animate-pulse font-mono text-lg">
          But now we are inside the Section Container 👾
        </h2>
        <p className="text-slate-800">
          How sick is that?{" "}
          <span className="inline-block animate-spin text-2xl">💿</span>
        </p>
      </SectionContainer>
    </div>
  );
};

export default Landing;
