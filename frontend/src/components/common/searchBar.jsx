import { useState } from "react"
import {HiMagnifyingGlass, HiMiniXMark} from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFIlters,productSliceaction } from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";


function SearchBar() {
    const [searchTarm, setSearchTarm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const {filters} = useSelector((state) => state.products)
    const navigate = useNavigate()


    const handleSearchToggle = () => {
        
        setIsOpen(!isOpen);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(productSliceaction.setFilters({search : searchTarm}));
        dispatch(fetchProductsByFIlters(filters))
        navigate(`/collection/all?search=${searchTarm}`)
        setIsOpen(false);
    }
    return (

        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen? "absolute top-0 left-0 w-full bg-white h-24 z-50": "w-auto"}`}>
            {isOpen? (
            <form onSubmit={handleOnSubmit} className="relative flex items-center justify-center w-full">
                <div className="relative w-1/2">
                <input type="text" 
                onChange={(e) => setSearchTarm(e.target.value)}
                placeholder="Search"
                value={searchTarm}
                className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outlline-none w-full placeholder:text-gray-700" 
                />

                {/*Search icon */}
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-800 text-gray-600 cursor-pointer">
                    <HiMagnifyingGlass className="h-6 w-6"/>
                </button>

                {/*Close button */}

                <button 
                type='button' 
                onClick={handleSearchToggle}
                className='absolute  top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer'>
                    <HiMiniXMark className='h-6 w-6'/>
                </button>
                </div>

            </form>
            ): (
                <button onClick={handleSearchToggle}>
                    <HiMagnifyingGlass className='h-6 w-6 cursor-pointer'/>
                </button>
            )}
            
        </div>
    )
}

export default SearchBar