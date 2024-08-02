import SortHotel from "../../sort/SortHotel";
import FilterByAminites from "./FilterByAminites";
import FilterByPriceRange from "./FilterByPriceRange";
import FilterByStarCategory from "./FilterByStarCategory";

const Filter = () => {
  return (
    <>
      <div className="col-span-3 space-y-4">
        <SortHotel />
        <FilterByPriceRange/>
        <FilterByStarCategory/>
        <FilterByAminites/>
        
      </div>
    </>
  );
};

export default Filter;
