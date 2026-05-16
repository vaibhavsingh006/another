const ProductCard = ({
  product,
  handleAddToCart,
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={product.image || "https://via.placeholder.com/400x400?text=No+Image"}
        alt={product.title || "Product image"}
        className="h-52 w-full object-cover"
      />

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-slate-900">
          {product.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-slate-900">
            ₹ {product.price}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
        <button
          onClick={() => handleAddToCart(product._id)}
          disabled={product.stock <= 0}
          className="mt-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;