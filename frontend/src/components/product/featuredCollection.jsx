import { Link } from "react-router-dom"
import featured from "../../assets/featured.webp"
function FeaturedCollection() {
    return (
        <>
        <section className="py-16 px-4 lg:px-2">
            <div className="container mx-auto  bg-green-100 flex lg:flex-row flex-col-reverse rounded-2xl">
                {/*Left contant */}
                <div className=" my-auto lg:w-1/2 p-8 text-center lg:text-left">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Comfort & Style</h2>
                    <h2 className="lg:text-5xl text-4xl font-bold mb-6">
                        Apparel made for Your everydaylife
                    </h2>
                    <p className="text-gray-500 text-lg mb-6">
                        Discover high quality, comfortable clothing that effortlessly blends fashion and function. Design to make you look feel great every day.
                    </p>
                    <div className="mb-4 mt-4">
                    <Link to="/collection/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-700">Shop Now</Link>
                    </div>
                </div>

                {/*Right side */}
                <div className="lg:w-1/2">
                    <img src={featured} alt="Featured collection" className="w-full h-full object-cover rounded-tr-2xl lg:rounded-br-2xl  rounded-tl-2xl lg:rounded-tl-none"/>
                </div>
            </div>
        </section>
        </>
    )
}

export default FeaturedCollection