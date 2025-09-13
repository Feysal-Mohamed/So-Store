
const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example product cards */}
        {[1, 2, 3, 4, 5, 6].map((product) => (
          <div key={product} className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow">
            <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-500">Product {product}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Product {product}</h3>
            <p className="text-gray-600 mt-2">$19.99</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
