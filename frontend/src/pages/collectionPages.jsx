import { useEffect, useRef, useState } from "react"
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/product/FilterSidebar";
import SortOptions from "../components/product/sortOptions";
import ProductGrid from "../components/product/productGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFIlters } from "../redux/slices/productSlice";
import { RxCross2 } from "react-icons/rx";

function CollectionPages() {
    const {collection}= useParams();
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch();
    const {products, error, loading} = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams])
    // const [Products, setProducts] = useState([]);
    const sideBar = useRef();
    const filter = useRef();
    const [isSidebarOpen,setIsSidebarOpen] = useState(false)

    
    const handleSidebarOpen = () => {
        setIsSidebarOpen(!isSidebarOpen);
        
    }

    const handleClickOutside = (e)=> {
        if(sideBar.current && !sideBar.current.contains(e.target) && filter.current !== e.target && filter.current.firstChild !== e.target && filter.current.firstChild.firstChild !== e.target) {
            setIsSidebarOpen(false);

        }

    }

    useEffect(() => {
        document.addEventListener("mousedown",handleClickOutside);
        
    },[])

    useEffect(() => {
        dispatch(fetchProductsByFIlters({collection,...queryParams}))
    },[dispatch, collection, searchParams])

    let lastScroll = 0;
    

    useEffect(() => {
            window.addEventListener("scroll",() => {
        let currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            filter.current?.classList.remove("scroll-up1")
        }

        if (currentScroll > lastScroll && !filter.current?.classList.contains("scroll-down1")) {
            filter.current?.classList.remove("scroll-up1");
            filter.current?.classList.add("scroll-down1");
            setIsSidebarOpen(false)
        };

        if (currentScroll < lastScroll && filter.current?.classList.contains("scroll-down1")) {
            filter.current?.classList.add("scroll-up1");
            filter.current?.classList.remove("scroll-down1");
            setIsSidebarOpen(false)
        };
        lastScroll = currentScroll
    })

    },[filter, window.pageYOffset])
 
    return (
        <div className="flex flex-col lg:flex-row">
            {/*mobile filter button */}
            <button onClick={handleSidebarOpen} className="filter1 w-full lg:hidden p-2 border border-gray-300 rounded flex justify-center items-center"  ref={filter}>
                <FaFilter className="mr-2"/>
            </button>
            <div className="h-5"></div>

            {/*mobile sidebar */}
            <div ref={sideBar} className={`${isSidebarOpen? "translate-x-0 pt-26":"-translate-x-full"} fixed z-50  inset-y-0 overflow-auto transition-transform duration-300 left-0 bg-white w-64 lg:static lg:translate-x-0 border-r border-gray-300 lg:pt-0`}>
                <div className="fixed top-29 right-3 text-xl lg:hidden" onClick={handleSidebarOpen}>
                    <RxCross2 />
                </div>
                <FilterSidebar/>
            </div>
            <div className=" p-4">
                <h2 className="text-2xl mb-4">ALL COLLECTION</h2>

                {/*sort options */}
                <SortOptions/>

                <ProductGrid products={products} loading={loading} error={error}/>
            </div>
        </div>
    )
}

export default CollectionPages