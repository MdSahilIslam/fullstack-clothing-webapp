import { useEffect, useState } from "react"
import Hero from "../components/common/hero"
import FeaturedCollection from "../components/product/featuredCollection"
import FeatureSection from "../components/product/featureSection"
import GenderCollection from "../components/product/GENDERcOLLECTION.JSX"
import NewArrival from "../components/product/newArrival"
import ProductDetails from "../components/product/productDetails"
import ProductGrid from "../components/product/productGrid"
import {useDispatch, useSelector} from "react-redux"
import { fetchProductsByFIlters, bestSellerProduct } from "../redux/slices/productSlice"


function Home() {
    const dispatch = useDispatch();

    const {products,bestSeller, loading, error} = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProductsByFIlters({
            gender: "Women",
            limit: 8,
            category: "Top Wear"
        }));

        dispatch(bestSellerProduct())

    },[dispatch]);

    return (
        <>
            <Hero/>
            <GenderCollection/>
            <NewArrival/>

            {/*Best seller portion */}
            <div>
            <h2 className="text-3xl text-center font-bold mb-4 mt-12">Best Seller</h2>
            {bestSeller? <ProductDetails productId={bestSeller._id}/>:<p className="text-center">Loading BestSeller Product...</p>}
            
            </div>

            <div className="container mx-auto text-cnter mb-4">
                <h2 className="text-center text-3xl font-semibold mb-6">Top Wears for Women</h2>
                <ProductGrid products={products} loading={loading} error={error}/>
            </div>

            <FeaturedCollection/>
            <FeatureSection/>


        </>
    )
}

export default Home