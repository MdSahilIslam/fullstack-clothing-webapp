import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./productGrid";
import { fetchSimilarProducts, fetchProductDetails } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";

// const selectedProduct = [{
//     name: "Classic Oxford Button-Down Shirt",
//     description:
//       "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
//     price: 39.99,
//     discountPrice: 34.99,
//     countInStock: 20,
//     sku: "OX-SH-001",
//     category: "Top Wear",
//     brand: "Urban Threads",
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["Red", "Blue", "Yellow"],
//     collections: "Business Casual",
//     material: "Cotton",
//     gender: "Men",
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=39",
//         altText: "Classic Oxford Button-Down Shirt Front View",
//       },
//       {
//         url: "https://picsum.photos/500/500?random=40",
//         altText: "Classic Oxford Button-Down Shirt Back View",
//       },
//     ],
//     rating: 4.5,
//     numReviews: 12,
//   }]
// const similarProducts = [
//     {
//         _id : 1,
//         name : "Product 1",
//         price : 120,
//         images :[{
//                 url : "https://picsum.photos/500/500?random=1"
//             },]
//     },
//     {
//         _id : 2,
//         name : "Product 1",
//         price : 120,
//         images :[{
//                 url : "https://picsum.photos/500/500?random=2"
//             },]
//     },
//     {
//         _id : 3,
//         name : "Product 1",
//         price : 120,
//         images :[{
//                 url : "https://picsum.photos/500/500?random=3"
//             },]
//     },
//     {
//         _id : 4,
//         name : "Product 1",
//         price : 120,
//         images :[{
//                 url : "https://picsum.photos/500/500?random=4"
//             },]
//     }
// ]
function ProductDetails({productId}) {
    const {id} = useParams();
    const ProductId = productId || id;
    const {similarProducts,selectedProduct, loading, error} = useSelector((state) => state.products);
    const {user, guestId} = useSelector((state) =>  state.auth)
    const dispatch = useDispatch();
    // if(loading) {
    //     return <p>Loadin</p>
    // }
    // if(error) {
    //     return <p>error: {error}</p>
    // }

    useEffect(() => {
        const fetchingselectedProduct = () => {
             dispatch( fetchProductDetails(ProductId));
             dispatch(fetchSimilarProducts(ProductId))
        } 
        
        fetchingselectedProduct()
        // selectedProduct = [selectedProduct]
        
    },[dispatch, ProductId]);

    const [mainImage,setMainImage] = useState();
    const [itemColor,setItemColor] = useState();
    const [itemSize, setItemSize] = useState();
    const [itemQuantity, setItemQuantity] = useState(1);
    const [isButtonDisabled,setIsButtonDisabled] = useState(false) 

    useEffect(() => {
        if(selectedProduct){
            setMainImage(selectedProduct[0]?.images[0]?.url)
        }  
    },[selectedProduct])

    const quantituModifier = (operation) => {
        if (operation === "plus") {
            setItemQuantity((prev) => prev + 1 )
        }
        if (operation === "minus" && itemQuantity>1) {
            setItemQuantity((prev) => prev - 1)
        }
    }

    const addInCart = () => {
        if (!itemColor || !itemSize) {
            toast.error("Please select color and size before adding incart",{duration:1000});
            return
        }
        // else {
        //     toast.success("Item added to cart",{duration:1500});
        //     setIsButtonDisabled(true)
        // }
            
        
        // setTimeout(() => {           
        //     setIsButtonDisabled(false);
        // },1500)
        
        dispatch(
            addToCart({
                user: user?.id,
                productId: ProductId,
                size: itemSize,
                color: itemColor,
                guestId: guestId,
                quantity: itemQuantity

            })
        ).then(() => {
                toast.success("Item added to cart",{duration:1500});
                setIsButtonDisabled(true)

            }).finally(() => {
                setIsButtonDisabled(false);
                setItemColor(null);
                setItemSize(null)
            })
        
    }

    if (loading) {
    return <><p className="text-center">Loading...</p></>
    }

    if (error) {
    return <><p className="text-center">Error:{error}</p></>
    } 


    return (
        <>
        <div className="p-6">
            {selectedProduct && 
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/*Leftside-thumbnails*/}
                    <div className="hidden md:flex flex-col space-y-6 mr-6">
                       {
                        selectedProduct?.map((item) => (
                            item.images?.map((image,ind) => (
                                <div key={ind} className="w-20 h-20 cursor-pointer" onClick={() => {setMainImage(image.url)}}>
                                    <img src={image.url} alt={image?.altText || "Thumbnail jacket"} className={`rounded-lg object-cover border ${mainImage === image.url? "border-red-400 border-4" : "border-gray-500"}`} />
                                </div>
                            ))
                            
                        ))
                       } 
                    </div>

                    {/* main image*/ }
                    <div className="md:w-1/2">
                        {selectedProduct?.map((item,ind) => (
                            <div key={ind} className="mb-4">
                                <img src={mainImage} alt={item.images[0]?.altText} className="h-auto object-cover rounded-lg w-full"/>
                            </div>      
                        ))}
                        
                    </div>

                    {/*Mobile thumbnail */}
                    <div className="md:hidden overscroll-x-contain flex space-x-4 mb-5">
                        {
                        selectedProduct?.map((item) => (
                            item.images?.map((image,ind) => (
                                <div key={ind} className="w-20 h-20 cursor-pointer" onClick={() => {setMainImage(image.url)}}>
                                    <img src={image?.url} alt={image?.altText || "Thumbnail jacket"} className={`rounded-lg object-cover border ${mainImage === image.url? "border-red-400 border-4" : "border-gray-500"}`} />
                                </div>
                            ))
                            
                        ))
                       } 
                    </div>

                    {/*Right side */}
                    <div className="md:ml-8 md:w-1/2">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-3">{selectedProduct[0]?.name}</h2>
                            <p className="text-gray-600 line-through mb-1 text-lg">{selectedProduct[0]?.originalPricer}</p>
                            <p className="text-xl text-gray-800 mb-2">$ {selectedProduct[0]?.price}</p>
                            <p className="text-gray-600 mb-4">{selectedProduct[0]?.description}</p>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">Color:</p>
                                <div className="flex gap-2"> 
                                    {selectedProduct[0]?.colors.map((color,ind) => (
                                        <button key={ind} onClick={() => {setItemColor(color)}} className={`h-8 w-8 rounded-full border-gray-500 cursor-pointer ${itemColor === color? "border-dotted border-white border-4":""}`}
                                        style={{backgroundColor : color.toLocaleLowerCase(),filter: "brightness(0.5)"}}></button>
                                    ))}
                                </div>
                            </div>

                             <div className="mb-4">
                                <p className="text-gray-700 mb-2">Size:</p>
                                <div className="flex gap-2"> 
                                    {selectedProduct[0]?.sizes.map((size,ind) => (
                                        <button key={ind} onClick={() => {setItemSize(size)}} className={`px-4 py-2 rounded border cursor-pointer ${itemSize === size? "bg-black text-white" : ""}`}
                                        > 
                                        {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 ">Size:</p>
                                <div className="flex items-cenetr mt-2"> 
                                    <button onClick={() => {quantituModifier("minus")}} className="py-1 px-3 bg-gray-200 cursor-pointer rounded-sm text-lg"> -</button>
                                    <span className="text-xl py-1 w-[45px] text-center">{itemQuantity}</span>
                                    <button onClick={() => {quantituModifier("plus")}} className="py-1 px-3 bg-gray-200 cursor-pointer rounded-sm text-lg"> +</button>
                                </div>
                            </div>

                            <button disabled={isButtonDisabled} onClick={addInCart} className={`bg-black text-white rounded w-full py-2  ${isButtonDisabled? "bg-black/50 cursor-not-allowed":"cursor-pointer hover:bg-gray-700"}`}> {isButtonDisabled? "Adding...": "ADD TO CART"} </button>

                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4 ">Characteristics:</h3>
                                <table className="w-full text-left text-sm text-gray-600">
                                    <tbody>
                                    <tr>
                                        <td className="py-1">Brand</td>
                                        <td className="py-1">{selectedProduct[0]?.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1">Materials</td>
                                        <td className="py-1">{selectedProduct[0]?.material}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-center font-medium text-2xl mb-4">You May also Like</h2>
                    <div>
                        <ProductGrid products={similarProducts} loading={loading} error={error}/>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default ProductDetails