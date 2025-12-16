import { useEffect, useState } from "react";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { updateAdminProduct } from "../../redux/slices/adminProductSlice";
import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {id} = useParams();
  const {selectedProduct, error, loading} = useSelector((state) => state.products)
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
    collection: "",
    material: "",
    gender: "",
    images: [
    ],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    
    if (id) {
      dispatch(fetchProductDetails(id));
      
    }
  },[dispatch, id]);

  useEffect(() => {
    

    if(selectedProduct) {
      const [slectedProductObj] = selectedProduct
      setProductData(slectedProductObj); 
    } 
    
  },[selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image",file)
    try{
      setUploading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,formData,{
        headers: {"Content-Type":"multipart/form-data"}
      });
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, {url: response.data.imageUrl, altText:""}]
      }))
      setUploading(false)
    }catch(err){
      console.error(err);
      setUploading(false);
    }
  } 
  
  const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAdminProduct({id, productData}));
        navigate('/admin/products')
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
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
            {uploading? "Uploading...":""}
            <div className="flex gap-4 mt-4">
                {
                    productData.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.altText || "Product Image"} className="w-20 h-20 rounded object-cover shadow-md"/>
                    ))
                }
            </div>
        </div>

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 rounded-md cursor-pointer transition-colors py-2 text-white">Update Product</button>
      </form>
    </div>
  );
}

export default EditProductPage;
