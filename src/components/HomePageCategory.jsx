import { cards } from "../data/categories";
import { useState, useEffect } from "react";
import FilterCard from "./FilterCard";

const HomePageCategory = ({ padding, filterFunc = function () {} }) => {
  const [isMoreShown, setIsMoreShown] = useState(false);
  const [visibleCards, setVisibleCards] = useState(null);

  const showMore = () => {
    setIsMoreShown(!isMoreShown);
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1536) {
        setVisibleCards(8);
      } else if (screenWidth >= 1280) {
        setVisibleCards(6);
      } else if (screenWidth >= 1024) {
        setVisibleCards(5);
      } else if (screenWidth >= 768) {
        setVisibleCards(4);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);
  return (
    <div>
      <div className={`flex flex-col gap-4 ${padding}`}>
        <h2 className="mb-4 text-lg font-bold md:text-xl">
          Filter By Category
        </h2>

        <div className="flex flex-wrap gap-4">
          {cards
            .slice(0, isMoreShown ? cards.length : visibleCards)
            .map((card, index) => {
              const { img, text } = card;
              return (
                <FilterCard
                  key={index}
                  img={img}
                  text={text}
                  filter={filterFunc}
                />
              );
            })}
        </div>

        <span
          className="cursor-pointer pb-4 text-right text-xs font-bold"
          onClick={showMore}
        >
          {isMoreShown ? "View Less" : "View More"}
        </span>
      </div>
    </div>
  );
};
export default HomePageCategory;
