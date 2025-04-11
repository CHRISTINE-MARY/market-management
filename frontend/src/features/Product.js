import React, { useEffect, useState } from "react";
import { useMessage } from "../context/MessageContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import BuyStock from "./BuyStock";

const Products = () => {
  const navigate = useNavigate();
  const { message, updateMessage } = useMessage();
  const [products, setProducts] = useState([]);
  const [buyId, setId] = useState("");
  const [buyStock, setStock] = useState("");
  const [showBuy, setBuy] = useState(false);
  const getProducts = async () => {
    try {
      const response = await API.get("/product/get");
      setProducts(response.data.data);
    } catch (err) {
      updateMessage(err.message);
    }
  };
  const handleBuy = (id, stock) => {
    setBuy(!showBuy);
    setId(id);
    setStock(stock);
  };

  useEffect(() => {
    getProducts();
  }, [showBuy]);

  return (
    <>
      <div className="product-header">
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div>Stock</div>
  
      </div>
      <section className="products">
        {products.length > 0 ? (
          <>
            {products.map((product, index) => (
              <div className="product-row" key={index}>
                <div>{product.Name}</div>
                <div>{product.Category}</div>
                <div>{product.Price}</div>
                <div>{product.Stock}</div>
                <div>
                  <button
                    onClick={() =>
                      navigate("/stockForm", {
                        state: { id: product._id, mode: "update" },
                      })
                    }
                  >
                    Update Product
                  </button>
                </div>
                <div>
                  <button onClick={() => handleBuy(product._id, product.Stock)}>
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No products found</div>
        )}
      </section>

      <section>
        <div>
          {showBuy && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button onClick={() => setBuy(false)} className="close">
                  X
                </button>
                <BuyStock id={buyId} stock={buyStock} onBuy={handleBuy} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
