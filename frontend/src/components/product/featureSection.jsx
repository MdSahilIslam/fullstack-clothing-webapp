import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi"
import { HiArrowPathRoundedSquare } from "react-icons/hi2"

function FeatureSection() {
    return (
        <>
       <section className="py-6 px-4 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center flex-col">
                <div className="p-4 rounded-full mb-4">
                    <HiShoppingBag className="text-xl"/>
                </div>
                <h4 className="mb-2 tracking-tighter">FREE INTERNATIONAL SHIPPING</h4>
                <p className=" text-gray-600 tracking-tighter text-sm">On all orders over $100.00</p>

            </div>

            <div className="flex items-center flex-col">
                <div className="p-4 rounded-full mb-4">
                    <HiArrowPathRoundedSquare className="text-xl"/>
                </div>
                <h4 className="mb-2 tracking-tighter">45 DAYS RETURN </h4>
                <p className=" text-gray-600 tracking-tighter text-sm">Money back Gurantee</p>

            </div>

            <div className="flex items-center flex-col">
                <div className="p-4 rounded-full mb-4">
                    <HiOutlineCreditCard className="text-xl"/>
                </div>
                <h4 className="mb-2 tracking-tighter">SECURE CHECKOUT</h4>
                <p className=" text-gray-600 tracking-tighter text-sm">100% secured checkout</p>

            </div>
        </div>

       </section>
        </>
    )
}

export default FeatureSection