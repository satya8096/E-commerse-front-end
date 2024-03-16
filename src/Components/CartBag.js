import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import CheckAuth from "../Reducers/CheckAuth";
import cartFilteredData from "../Reducers/CartBagItemsFiltered";
import CartLength from "../Reducers/CartLenght";

export default function CartBag() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [totalSalePrice, setTotalSalePrice] = useState(0);
  if (quantity === 0) {
    alert("Minimum  1 Quanity is Required !");
    setQuantity(1);
  } else if (quantity === 6) {
    alert("Maximum 5 Qunatity is Allowed");
    setQuantity(5);
  }

  const userDetails = async () => {
    const user = await CheckAuth(localStorage.getItem("user"));
    const response = await fetch(
      "https://shopykit-back-end.onrender.com/shopykit/api/v1/all-products"
    );
    const totalProducts = await response.json();
    const cartProducts = await user.cart.map((each) => {
      const g = cartFilteredData(totalProducts, each);
      return g;
    });
    const k = cartProducts.flat();
    setCart(k);
  };

  const fun = async () => {
    let totalMaxPriceCal = await cart.reduce((prev, curent) => {
      return prev + Number(curent.maxPrice);
    }, 0);
    let totalSalePriceCal = await cart.reduce((prev, curent) => {
      return prev + Number(curent.salePrice);
    }, 0);
    setTotalPrice(totalMaxPriceCal);
    setTotalSalePrice(totalSalePriceCal);
  };

  // Remove products
  const removeProductFromCart = async (id) => {

    if(window.confirm("Do you Want to Remove Item From Cart ?")){
       const user = await CheckAuth(localStorage.getItem("user"));
       const { _id, cart } = user;
       cart.pop(id);
       let length = cart.length;
       let countEle = document.getElementById("cart-count");
       countEle.innerHTML = length;
       window.location.reload(true);
       await fetch(
         `https://shopykit-back-end.onrender.com/shopykit/api/v1/user-details/:${id}`,
         {
           method: "PATCH",
           body: JSON.stringify({ id: _id, cart: cart }),
           headers: {
             "content-type": "application/json",
           },
         }
       );
    }
    else{
      return ''
    }

  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      fun();
    }
    // eslint-disable-next-line
  }, [cart.length]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      userDetails();
      CartLength();
    }
  }, []);

  return (
    <div className="cart-main-container">
      {cart.length !== 0 && (
        <>
          <div className="cart-products-list d-flex ">
            {cart.map((each) => {
              const { _id, longName, salePrice, maxPrice, imgURL, type } = each;
              return (
                <div className="cart-product d-flex" key={_id}>
                  <div className="cart-img">
                    <img src={imgURL} alt="img" width={"100%"} />
                    <div className="quantity-btns">
                      <Link onClick={(e) => setQuantity(quantity - 1)}>-</Link>
                      <span>{quantity}</span>
                      <Link onClick={(e) => setQuantity(quantity + 1)}>+</Link>
                    </div>
                  </div>
                  <div className="cart-content pt-2">
                    <h5>
                      <Link
                        to={`/${type}/product-details/${_id}`}
                        style={{
                          textDecoration: "none",
                          lineHeight: "1.8rem",
                          color: "black",
                        }}
                      >
                        {longName}
                      </Link>
                    </h5>
                    <span>Size : XL</span>
                    <span>Seller : Satyanarayana</span>
                    <span>
                      <span className="text-decoration-line-through">
                        Rs. {maxPrice}/-
                      </span>{" "}
                      <span
                        className=""
                        style={{ fontWeight: "600", fontSize: "1.5rem" }}
                      >
                        Rs. {salePrice}/-
                      </span>
                      <span>
                        {" "}
                        {Math.round(((maxPrice - salePrice) / maxPrice) * 100)}%
                        Off
                      </span>
                    </span>
                    <button
                      className="btn btn-danger"
                      style={{ width: "6rem" }}
                      onClick={(e) => removeProductFromCart(_id)}
                    >
                      Remove
                    </button>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
            <hr></hr>
          </div>
          <div className="cart-price-details">
            <h5>Price Details</h5>
            <hr></hr>
            <table>
              <tbody>
                <tr>
                  <th>Price({cart.length} items)</th>
                  <td>Rs. {totalPrice}</td>
                </tr>
                <tr>
                  <th>Discount</th>
                  <td>- Rs. {totalPrice - totalSalePrice}</td>
                </tr>
                <tr>
                  <th>Buy More & Save More</th>
                  <td>- Rs. 29</td>
                </tr>
                <tr>
                  <th>Coupons For You</th>
                  <td>- Rs. 19</td>
                </tr>
                <tr>
                  <th>
                    Delivery Charges
                    <hr></hr>
                  </th>
                  <td>
                    <span className="text-decoration-line-through">
                      - Rs. 90
                    </span>{" "}
                    Free
                    <hr></hr>
                  </td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rs. {totalSalePrice - 48}</td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <h6>
              You Will Save Rs. {totalPrice - totalSalePrice + 29 + 19}/- On
              This Order
            </h6>
            <div className="d-flex align-items-center justify-content-center mt-2 ">
              <button className="btn btn-warning mt-4">Place Order</button>
            </div>
          </div>
        </>
      )}
      {cart.length === 0 && (
        <div className="cart-empty-container">
          <div className="cart-empty-container-img">
            <img src="/other-images/cart-empty.webp" alt="img" width={"100%"} />
          </div>
          <h6>Your Cart Is Empty !</h6>
          <p>Add items to now</p>
          <Link className="btn btn-warning" to={"/"}>
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
}
