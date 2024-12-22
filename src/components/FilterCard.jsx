import { useState } from "react";

const FilterCard = ({
  img,
  text,
  filter = function () {},
  onHomeClick = function () {},
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    onHomeClick(text);
    filter(text); // Call the filter function to update the filter
  };

  return (
    <div
      className="group relative flex h-32 w-32 cursor-pointer flex-col gap-4 overflow-hidden rounded-lg border p-4 transition-all duration-300 md:h-40 md:w-40"
      onClick={toggleSelection}
    >
      <div
        className={`absolute left-20 top-20 h-32 w-32 rounded-full bg-blue-400 opacity-0 blur-[50px] transition-all duration-300 group-hover:opacity-30 ${
          isSelected ? "opacity-50" : "opacity-0"
        }`}
      ></div>

      <div id="imgContainer" className="h-8 w-8 object-cover md:h-10 md:w-10">
        <img className="h-full w-full" src={img} alt={text} />
      </div>
      <h3 className="text-base font-bold leading-6 md:text-lg">{text}</h3>
    </div>
  );
};

export default FilterCard;
