"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByAminites = () => {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      const filtered = query.filter((item) => item !== name);
      setQuery(filtered);
    }
  };

  useEffect(()=>{
    const amenities = params.get("amenities")
    if(amenities){
      const decodedUri = decodeURI(amenities)
      const queryInAmenities = decodedUri.split("|")
      setQuery(queryInAmenities)
    }
  }, [])
  
  useEffect(() => {
    if (query.length > 0) {
      params.set("amenities", encodeURI(query.join("|")));
    } else {
      params.delete("amenities");
    }
    replace(`${pathName}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="wifi">
          <input
            type="checkbox"
            name="wifi"
            id="wifi"
            checked={query.includes("wifi")}
            onChange={handleChange}
          />
          Wi-fi
        </label>

        <label htmlFor="swimmingPool">
          <input
            type="checkbox"
            name="swimmingPool"
            id="swimmingPool"
            checked={query.includes("swimmingPool")}
            onChange={handleChange}
          />
          Swimming Pool
        </label>
      </form>
    </div>
  );
};

export default FilterByAminites;
