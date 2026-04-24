import React, { useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProduct = useSelector((state) => state.product.sellerProduct);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 pb-20"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">
          {/* ── Top Bar ── */}
          <div className="pt-10 pb-0 flex items-center justify-between">
            <span
              className="text-xs font-medium tracking-[0.32em] uppercase cursor-pointer"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#a76c00ff",
              }}
              onClick={() => navigate("/")}
            >
              Snitch.
            </span>
            <button
              onClick={() => navigate("/seller/create-product")}
              className="text-[10px] cursor-pointer uppercase tracking-[0.2em] font-medium transition-colors duration-200 bg-[#1b1c1a] text-white px-3 py-2 hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
            >
              + Create Product
            </button>
          </div>

          {/* ── Page Header ── */}
          <div className="pt-14 pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1
                className="text-4xl lg:text-5xl font-light leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                Seller Dashboard
              </h1>
              {/* Gold rule separator */}
              <div
                className="mt-4 w-14 h-px"
                style={{ backgroundColor: "#C9A96E" }}
              />
            </div>
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "#B5ADA3" }}
              >
                {sellerProduct?.length || 0} listings
              </p>
            </div>
          </div>

          {/* ── Products Grid ── */}
          {sellerProduct && sellerProduct.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
              {sellerProduct.map((product) => (
                <div key={product._id} className="flex flex-col group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: "#eae8e5" }}>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs tracking-widest uppercase" style={{ color: "#B5ADA3" }}>
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-sm font-medium transition-colors duration-200 truncate"
                      style={{ color: "#1b1c1a" }}
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <p
                      className="text-xs truncate"
                      style={{ color: "#7A6E63" }}
                      title={product.description}
                    >
                      {product.description}
                    </p>
                    <p
                      className="text-sm uppercase tracking-[0.1em] mt-2 font-bold "
                      style={{ color: "#9c7834ff" }}
                    >
                      {product.price?.currency || "INR"} {product.price?.amount?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Empty State ── */
            <div className="py-24 flex flex-col items-center justify-center text-center border-t border-b border-dashed" style={{ borderColor: "#d0c5b5" }}>
              <p
                className="text-sm"
                style={{ color: "#7A6E63" }}
              >
                You haven't listed any products yet.
              </p>
              <button
                onClick={() => navigate("/seller/create-product")}
                className="mt-6 px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300"
                style={{
                  backgroundColor: "#1b1c1a",
                  color: "#fbf9f6",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C9A96E";
                  e.currentTarget.style.color = "#1b1c1a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1b1c1a";
                  e.currentTarget.style.color = "#fbf9f6";
                }}
              >
                Create First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;