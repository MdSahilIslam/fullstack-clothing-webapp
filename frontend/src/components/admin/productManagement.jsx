import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteAdminProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice";
import { useEffect } from "react";

function ProductManagement() {
    const dispatch =useDispatch();
    const {products, loading, error} = useSelector((state) => state.adminProduct);

    useEffect(() => {
        dispatch(fetchAdminProducts())
    },[dispatch])

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete product ${id}`)) {
            dispatch(deleteAdminProduct(id))
        }
    }
    if(loading)  {
    <p className="text-center">Loading...</p>
  }

   if(error)  {
    <p className="text-center">Error:{error}.</p>
  }
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>
            <div className="overflow-x-auto sm:rounded-lg shadow-md">
                <table className="min-w-full text-gray-500 text-left">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">SKU</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length >0? (products.map((product) => (
                            <tr key={product._id} className="font-medium hover:bg-gray-50 border-b border-gray-300">
                                <td className="p-4 whitespace-nowrap text-gray-700">
                                    {product.name}
                                </td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4">{product.sku}</td>
                                <td className="p-4">
                                    <Link to={`/admin/products/${product._id}/edit`}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-2 py-1 mr-2 ">
                                        Edit
                                    </Link>
                                    <button className="bg-red-500 hover:bg-red-600 py-1 px-2 rounded text-white cursor-pointer mt-2" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))):(<tr>
                            <td colSpan={4} className="text-center text-gray-500 p-4">No Products Found!!!</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement