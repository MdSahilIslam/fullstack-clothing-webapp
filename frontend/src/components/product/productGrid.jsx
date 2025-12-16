import { Link } from "react-router-dom";

function ProductGrid({ products, loading, error }) {
  if (loading) {
    return <><p className="text-center">Loading...</p></>
  }

  if (error) {
    return <><p className="text-center">Error:{error}</p></>
  }
  return (
    <>
      <div className="flex justify-center">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, index) => {
            return (
              <Link key={index} to={`/products/${item._id}`}>
                <div className="p-4 rounded-3xl">
                  <div className="w-full h-96 mb-4">
                    <img
                      src={item.images[0]?.url}
                      alt={item.images[0]?.altText || item.name}
                      className="w-full h-96 rounded-3xl object-cover"
                    />
                  </div>
                  <h3 className="text-sm mb-2">{item.name}</h3>
                  <p className="text-sm font-medium text-gray-500 tracking-tighter">$ {item.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductGrid;
