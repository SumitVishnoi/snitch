import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useProduct } from "../hook/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { handleGetProductById } = useProduct();

  async function fetchProductDetails() {
    try {
      const data = await handleGetProductById(productId);
      // Handle both cases depending on how API is structured
      setProduct(data?.product || data);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);


  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center selection:bg-[#C9A96E]/30"
        style={{ backgroundColor: "#fbf9f6" }}
      >
        <p
          style={{ fontFamily: "'Inter', sans-serif", color: "#B5ADA3" }}
          className="text-[10px] uppercase tracking-[0.2em] font-medium animate-pulse"
        >
          Retrieving piece...
        </p>
      </div>
    );
  }

  console.log(product);
  
  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 pb-24"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-12 lg:pt-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* ── LEFT: Image Gallery ── */}
            <div className="w-full lg:w-[70%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">


              {/* Main Image */}
              <div
                className="relative w-full aspect-4/5 overflow-hidden group"
                style={{ backgroundColor: "#f5f3f0" }}
              >
                <img src={product.images[0].url} />
              </div>
            </div>

            {/* ── RIGHT: Product Details ── */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-24 flex flex-col pt-4">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1b1c1a",
                }}
              >
                {product.title}
              </h1>

              <div
                className="h-px w-full mb-8"
                style={{ backgroundColor: "#e4e2df" }}
              />

              <div className="mb-12">
                <h3
                  className="text-[10px] uppercase tracking-[0.24em] font-medium mb-4"
                  style={{ color: "#C9A96E" }}
                >
                  The Details
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7A6E63" }}
                >
                  {product.description}
                </p>
              </div>

              {/* Extra elegant details */}
              <div
                className="mt-14 space-y-4 text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "#B5ADA3" }}
              >
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Shipping</span>
                  <span>Complimentary over INR 15,000</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Returns</span>
                  <span>Within 14 days of delivery</span>
                </div>
                <div
                  className="flex justify-between border-b pb-3"
                  style={{ borderColor: "#e4e2df" }}
                >
                  <span>Authenticity</span>
                  <span>100% Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
