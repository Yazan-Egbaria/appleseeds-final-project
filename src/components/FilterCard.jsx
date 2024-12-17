const FilterCard = ({ img, text }) => {
  return (
    <div className="group relative flex h-32 w-32 cursor-pointer flex-col gap-4 overflow-hidden rounded-lg p-4 shadow-xAndY transition-all duration-300 md:h-40 md:w-40">
      <div className="absolute left-20 top-20 h-32 w-32 rounded-full bg-teal-400 opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-30"></div>

      <div id="imgContainer" className="h-8 w-8 object-cover md:h-10 md:w-10">
        <img className="h-full w-full" src={img} alt={text} />
      </div>
      <h3 className="text-base font-bold leading-6 md:text-lg">{text}</h3>
    </div>
  );
};

export default FilterCard;
