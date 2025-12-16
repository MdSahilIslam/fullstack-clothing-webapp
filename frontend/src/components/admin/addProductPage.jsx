import { useEffect, useState } from "react";
import ProductDetails from "../product/productDetails";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { createAdminProduct, updateAdminProduct } from "../../redux/slices/adminProductSlice";
import { useNavigate, useParams } from "react-router-dom";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
    ],
  });

  const [Loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image",file)
    try{
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,{
        headers: {"Content-Type":"multipart/form-data"}
      });
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, {url: response.data.imageUrl, altText:""}]
      }))
      setLoading(false)
    }catch(err){
      console.error(err);
      setLoading(false);
    }
  } 
  
  const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAdminProduct(productData));
        navigate('/admin/products')
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form action="" onSubmit={handleSubmit}>
        {/*Name */}
        <div className="mb-6">
          <label htmlFor="name" className="font-semibold mb-2 block">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div>

        {/*Description */}
        <div className="mb-6">
          <label htmlFor="name" className="font-semibold mb-2 block">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div>

        {/*Category */}
        <div className="mb-6">
          <label htmlFor="category" className="font-semibold mb-2 block">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div>

        {/*Collection */}
        <div className="mb-6">
          <label htmlFor="collection" className="font-semibold mb-2 block">
            Collection
          </label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div>

        {/*Brand */}
        <div className="mb-6">
          <label htmlFor="material" className="font-semibold mb-2 block">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"

          />
        </div>

        {/*Material */}
        <div className="mb-6">
          <label htmlFor="material" className="font-semibold mb-2 block">
            Material
          </label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"

          />
        </div>

        {/*Gender */}
        <div className="mb-6">
          <label htmlFor="gender" className="font-semibold mb-2 block">
            Gender
          </label>
          <select
            type="dropdown"
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
            </select>
        </div>

        {/*Price */}
        <div className="mb-6">
          <label htmlFor="price" className="font-semibold mb-2 block">
            price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div> 

        {/*Count in Stock */}
        <div className="mb-6">
          <label htmlFor="countInStock" className="font-semibold mb-2 block">
            Count In Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div> 

        {/*SKU */}
        <div className="mb-6">
          <label htmlFor="sku" className="font-semibold mb-2 block">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div> 

        {/*Sizes */}
        <div className="mb-6">
          <label htmlFor="sizes" className="font-semibold mb-2 block">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) => setProductData({...productData,
                [e.target.name] : e.target.value.split(",").map((size) => size.trim())
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div> 

        {/*Colors */}
        <div className="mb-6">
          <label htmlFor="colors" className="font-semibold mb-2 block">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) => setProductData({...productData,
                [e.target.name] : e.target.value.split(",").map((color) => color.trim())
            })}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
        </div> 

        {/*Image upload */}
        <div className="mb-6">
            <label htmlFor="imageUpload" className="font-semibold mb-2 block">
                Upload Product Image
            </label>
            <input type="file" onChange={handleImageUpload} className="bg-gray-400 p-1 w-70 rounded border-2 mx-auto"/>
            {Loading? "Uploading...":""}
            <div className="flex gap-4 mt-4">
                {
                    productData.images?.map((image, index) => (
                        <img key={index} src={image.url} alt={image.altText || "Product Image"} className="w-20 h-20 rounded object-cover shadow-md"/>
                    ))
                }
            </div>
        </div>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 rounded-md cursor-pointer transition-colors py-2 text-white">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductPage;
