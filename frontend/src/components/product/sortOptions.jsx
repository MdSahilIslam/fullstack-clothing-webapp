import { useSearchParams } from "react-router-dom";

function SortOptions() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSort = (e) => {
        searchParams.set("sortBy",e.target.value)
        setSearchParams(searchParams);

    }
  return (
    <div className="flex justify-end mb-4 items-center">
      <select
        name=""
        id="sort"
        value = {searchParams.get("sortBy") || ""}
        onChange={handleSort}
        className="border p-2 rounded-lg border-gray-400 mr-1 focus:outline-none"
      >
        <option value="">Deafult</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDsc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}

export default SortOptions;
