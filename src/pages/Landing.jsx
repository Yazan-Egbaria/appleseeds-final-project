import { Link, useNavigate } from "react-router-dom";
import HomePageCategory from "../components/HomePageCategory";

const Landing = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/marketplace/${encodeURIComponent(category)}`);
  };
  return (
    <main className="pagePadding container mx-auto pt-20">
      <article className="group relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border px-8 py-16">
        <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300"></div>
        <p className="w-3/5 text-center text-lg md:text-xl xl:text-2xl">
          Peace Tech is a platform enabling diverse students to exchange
          services, earn in-app currency, and foster cross-cultural connections
          through rewarding collaborations.
        </p>
        <button
          className="rounded bg-blue-500 px-4 py-1 text-lg font-bold text-white transition-all duration-300 hover:bg-blue-600 md:text-xl xl:text-2xl"
          type="button"
        >
          <Link to="/marketplace">Explore</Link>
        </button>
      </article>

      <article className="flex w-full flex-wrap gap-4 pt-4">
        <section className="group relative flex h-64 w-64 flex-grow flex-col items-center justify-center overflow-hidden rounded-lg border text-center lg:flex-grow-0">
          <img
            className="w-20"
            src="images\collaboration-icon.png"
            alt="collab-icon"
          />
          <h3 className="text-lg font-bold text-blue-500 md:text-xl">
            Collaboration
          </h3>
          <div className="absolute -left-36 -top-20 -z-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300"></div>
        </section>

        <section className="group relative flex h-64 w-64 flex-grow flex-col items-center justify-center overflow-hidden rounded-lg border text-center lg:flex-grow-0">
          <div className="absolute -left-36 -top-20 -z-10 h-52 w-52 rounded-full bg-blue-400 opacity-50 blur-[50px] transition-all duration-300"></div>
          <img
            className="w-20"
            src="images\cultural-icon.png"
            alt="cultural-icon"
          />
          <h3 className="text-lg font-bold text-blue-500 md:text-xl">
            Cross-Cultural
          </h3>
        </section>

        <section className="group relative flex h-64 w-64 flex-grow flex-col items-start justify-end overflow-hidden rounded-lg border bg-blue-700 px-4 text-left">
          <p className="w-4/6 text-lg font-bold text-white max-md:w-4/5 md:text-xl">
            Join Barter Exchange <span className="text-blue-300">services</span>
            , <span className="text-blue-300"> earn rewards</span>,{" "}
            <span className="text-blue-300">and connect </span>
            cultures!
          </p>
          <button
            className="mb-4 mt-4 rounded bg-white px-4 py-1 text-lg font-bold text-blue-500 transition-all hover:bg-white hover:text-blue-600 md:text-xl xl:text-2xl"
            type="button"
          >
            <Link to="/marketplace">Explore</Link>
          </button>
        </section>
      </article>

      {/* about us */}

      <article className="mt-4 overflow-hidden rounded-xl border p-4">
        <section className="flex flex-col items-center justify-between gap-8 rounded-xl lg:flex-row lg:gap-0">
          <section className="flex flex-col items-center justify-center gap-4 text-center lg:items-start">
            <h3 className="text-xl font-bold text-blue-500 lg:text-2xl">
              About Us
            </h3>
            <p className="w-96 text-center lg:text-start">
              Peace Tech bridges cultural gaps by connecting students through
              service exchanges. Our platform encourages skill-sharing and
              rewards cross-cultural collaborations. Together, we’re building a
              community of diversity, learning, and mutual understanding.
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-1 text-lg font-bold text-white transition-all duration-300 hover:bg-blue-600 xl:text-2xl"
              type="button"
            >
              <Link to="/marketplace">Explore</Link>
            </button>
          </section>
          {/* break */}
          <section>
            <img src="images\about-img.png" alt="about-us-image" />
          </section>
        </section>
      </article>

      {/* Categories */}
      <HomePageCategory padding="pt-4" filterFunc={handleCategoryClick} />
    </main>
  );
};

export default Landing;
