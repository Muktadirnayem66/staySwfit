"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SortHotel = () => {
  const [query, setQuery] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter()
  const params = new URLSearchParams(searchParams);
  

  const handleChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const checked = event.target.checked

    if(checked){
      setQuery((prev)=>[...prev, name])
    }else{
      const filtered = query.filter((item)=> item !== name)
      setQuery(filtered)
    }

  };

  useEffect(()=>{
    const sortBy = params.get('sortby')
    if(sortBy){
      const decodedUri = decodeURI(sortBy)
      const queryInSortBy = decodedUri.split("|")
      setQuery(queryInSortBy)
    }

  }, [])  

  useEffect(()=>{
    if(query.length > 0){
      params.set("sortby", encodeURI(query.join("|")))
    }else{
      params.delete("sortby");
    }
    
    replace(`${pathName}?${params.toString()}`)
  }, [query])


  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="highToLow">
          <input
            className="mr-1"
            type="checkbox"
            name="highToLow"
            id="highToLow"
            checked={query.includes("highToLow")}
            onChange={handleChange}
          />
          Price High to Low
        </label>

        <label htmlFor="lowToHigh">
          <input
            className="mr-1"
            type="checkbox"
            name="lowToHigh"
            id="lowToHigh"
            checked={query.includes("lowToHigh")}
            onChange={handleChange}
          />
          Price Low to high
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
