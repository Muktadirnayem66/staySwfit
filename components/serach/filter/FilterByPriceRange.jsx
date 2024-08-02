"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByPriceRange = () => {
  const [query, setQuery] = useState([])
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams)

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked

    if(checked){
      setQuery(prev=>[...prev, name])
    }else{
      const filtered = query.filter((item)=> item !== name)
      setQuery(filtered)
    }
  };


  useEffect(()=>{
    const priceRange = params.get("price-range")

    if(priceRange){
      const decodeUri = decodeURI(priceRange)
      const queryInPriceRange = decodeUri.split("|")
      setQuery(queryInPriceRange)
    }

  },[])

  useEffect(()=>{
    if(query.length > 0){
      params.set("price-range", encodeURI(query.join("|")))

    }else{
      params.delete("price-range")
    }
    replace(`${pathName}?${params.toString()}`)

  }, [query])

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="range1">
          <input
            type="checkbox"
            name="1000-1500"
            id="range1"
            checked={query.includes("1000-1500")}
            onChange={handleChange}
          />
          $ 1000 - $ 1500
        </label>

        <label htmlFor="range2">
          <input
            type="checkbox"
            name="1500-2000"
            id="range2"
            checked={query.includes("1500-2000")}
            onChange={handleChange}
          />
          $ 1500 - $ 2000
        </label>

        <label htmlFor="range3">
          <input
            type="checkbox"
            name="2000-2500"
            id="range3"
            checked={query.includes("2000-2500")}
            onChange={handleChange}
          />
          $ 2000 - $ 2500
        </label>

        <label htmlFor="range3">
          <input
            type="checkbox"
            name="2500-3000"
            id="range3"
            checked={query.includes("2500-3000")}
            onChange={handleChange}
          />
          $ 2500 - $ 3000
        </label>

        <label htmlFor="range4">
          <input
            type="checkbox"
            name="3000-4000"
            id="range4"
            checked={query.includes("3000-4000")}
            onChange={handleChange}
          />
          $ 3000 - $ 4000
        </label>

        <label htmlFor="range5">
          <input
            type="checkbox"
            name="4000-5000"
            id="range5"
            checked={query.includes("4000-5000")}
            onChange={handleChange}
          />
          $ 4000 - $ 5000
        </label>
      </form>
    </div>
  );
};

export default FilterByPriceRange;
