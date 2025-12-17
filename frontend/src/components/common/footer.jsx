import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterFill, RiTwitterXFill } from "react-icons/ri"
import { TbBrandMeta } from "react-icons/tb"
import { FiPhoneCall } from "react-icons/fi"
import { Link } from "react-router-dom"
function Footer()  {
    return (
        <>
        <footer className="border-t border-gray-300 py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
                <div>
                    <h3 className="text-lg text-gray-800 mb-4">News Latter</h3>
                    <p className="text-gray-500 mb-4">
                        Be the first to here about new products, exclusive events, and online offers.
                    </p>
                    <p className="font-medium text-sm text-gray-600 mb-6">
                        Sign up and get 10% off for you first order.
                    </p>

                    {/* News latter form */}
                    <form className="flex" action="">
                        <input type="email"
                        placeholder="Enter your email"
                        className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-nonefocus:ring-2 focus;ring-gray-500 transition-all" />
                        <button type="submit" className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all">Subcribe</button>                
                    </form>
                </div>

                {/*Shop Links */}
                <div>
                    <h3 className="text-lg text-gray-600 mb-4">Shop</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <Link to="/collection/all?gender=Men&category=Top Wear" className="hover:text-gray-500 transitioon-colors">
                            Men's top Wear
                            </Link> 
                        </li>
                        <li>
                            <Link to="/collection/all?gender=Men&category=Bottom Wear" className="hover:text-gray-500 transitioon-colors">
                            Men's bottom Wear
                            </Link> 
                        </li>
                        <li>
                            <Link to="/collection/all?gender=Women&category=Top Wear" className="hover:text-gray-500 transitioon-colors">
                            Women's top Wear
                            </Link> 
                        </li>
                        <li>
                            <Link to="/collection/all?gender=Women&category=Bottom Wear" className="hover:text-gray-500 transitioon-colors">
                            Women's bottom Wear
                            </Link> 
                        </li>

                    </ul>
                </div>

                {/*support Links */}
                <div>
                    <h3 className="text-lg text-gray-600 mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>
                            <Link to="https://portfolio-website-of-sahil.netlify.app" className="hover:text-gray-500 transitioon-colors">
                            Contact Us
                            </Link> 
                        </li>
                        <li>
                            <Link to="https://portfolio-website-of-sahil.netlify.app" className="hover:text-gray-500 transitioon-colors">
                            About Us
                            </Link> 
                        </li>
                        <li>
                            <Link to="" className="hover:text-gray-500 transitioon-colors">
                            FAQs
                            </Link> 
                        </li>
                        <li>
                            <Link to="" className="hover:text-gray-500 transitioon-colors">
                            Features
                            </Link> 
                        </li>

                    </ul>
                </div>

                {/*follow us */}
                <div>
                    <h3 className="text-lg text-gray-800 mb-4 ">Follow Us</h3>
                    <div className="flex items-center space-x-4 mb-6">
                        <a href="http://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-500">
                            <TbBrandMeta className="h-5 w-5"/>
                        </a>
                        <a href="http://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-500">
                            <IoLogoInstagram className="h-5 w-5"/>
                        </a>
                        <a href="http://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-500">
                            <RiTwitterXFill className="h-4 w-4"/>
                        </a>
                    </div>
                    <p className="inline-block mr-2">Call Us</p>
                    <p>
                        <FiPhoneCall className="inline-block mr-2"/>
                        123-456-7890
                    </p>
                </div>

            </div>

            {/*Footer bottom */}
            <div className="container mx-auto mt-12 px-4 lg:px-0 boreder-t border-gray-200 pt-6">
                <p className="text-gray-500 text-sm tracking-tighter text-center">
                    © 2025, CompileTab, All Right Reserved (<a href="https://portfolio-website-of-sahil.netlify.app" className="text-blue-400">Sahil</a>)
                </p>
            </div>
        </footer>
        </>
    )
}

export default Footer