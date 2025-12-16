import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Grey",
    "White",
    "Pink",
    "Beige",
    "Navy",
    ""
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const gender = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });

    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { type, name, value, checked } = e.target;
    let newFilter = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...newFilter[name], value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }

    setFilters(newFilter);
    updateURLparameters(newFilter);
  };

  const updateURLparameters = (newFilter) => {
    const params = new URLSearchParams();
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.append(key, newFilter[key].join(","));
      } else if (newFilter[key]) {
        params.append(key, newFilter[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const maxPrice = Number(e.target.value);
    const newFilters = { ...filters,minPrice:0, maxPrice };
    setPriceRange([0, maxPrice]);
    setFilters(newFilters);
    updateURLparameters(newFilters);
  };

  return (
    <div className=" p-4">
      <h3 className="text-xl font-medium text-gray-700 text-center mb-2">
        Filter
      </h3>

      {/*category selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600 ">
          Category
        </label>
        {categories.map((category) => {
          return (
            <div key={category} className="flex items-center mb-1">
              <input
                type="radio"
                name={"category"}
                id={`${category}`}
                value={category}
                onChange={handleFilterChange}
                checked={filters.category === category ? true : false}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={`${category}`} className="text-gray-700">
                {category}
              </label>
            </div>
          );
        })}
      </div>

      {/*gender selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600 ">Gender</label>
        {gender.map((gender) => {
          return (
            <div key={gender} className="flex items-center mb-1">
              <input
                type="radio"
                name="gender"
                id={`${gender}`}
                value={gender}
                onChange={handleFilterChange}
                checked={filters.gender === gender ? true : false}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={`${gender}`} className="text-gray-700">
                {gender}
              </label>
            </div>
          );
        })}
      </div>

      {/*color selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600 ">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            return (
              <button
                key={color}
                name="color"
                value={color}
                onClick={handleFilterChange}
                checked={filters.color === color ? true : false}
                className={`p-2 w-8 h-8 rounded-full border border-gray-400 cursor-pointer hover:scale-105 transition ${
                  filters.color === color ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color.toLocaleLowerCase() }}
              ></button>
            );
          })}
        </div>
      </div>

      {/*Size selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600 ">Size</label>
        {sizes.map((size) => {
          return (
            <div key={size} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="size"
                id={`${size}`}
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={`${size}`} className="text-gray-700">
                {size}
              </label>
            </div>
          );
        })}
      </div>

      {/*material selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600 ">
          Material
        </label>
        {materials.map((material) => {
          return (
            <div key={material} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="material"
                id={`${material}`}
                value={material}
                onChange={handleFilterChange}
                checked={filters.material.includes(material)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={`${material}`} className="text-gray-700">
                {material}
              </label>
            </div>
          );
        })}
      </div>

      {/*brands selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-600 ">Brand</label>
        {brands.map((brand) => {
          return (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                id={`${brand}`}
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={`${brand}`} className="text-gray-700">
                {brand}
              </label>
            </div>
          );
        })}
      </div>

      {/*Price range selector */}
      <div className="mb-8">
        <label className="mb-2 text-gray-600 font-medium">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full rounded-lg h-2 cursor-pointer appearance-none bg-gray-300"
        />
        <div className="flex justify-between text-gray-600mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
