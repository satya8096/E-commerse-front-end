import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Success, Error } from "../Reducers/ErrorPops";
import CartLength from "../Reducers/CartLenght";
import CheckAuth from "../Reducers/CheckAuth.js";
const ErrorShow = (value) => Error(value);
const SuccessShow = (value) => Success(value);
export default function ProductDetails() {
  const [data, setData] = useState([]);
  let fetchURL =
    "https://shopykit-back-end.onrender.com/shopykit/api/v1/all-products";
  const params = useParams();
  const FetchData = async () => {
    try {
      const data = await fetch(fetchURL);
      const response = await data.json();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const product = data.filter((each) => {
    return each._id === params._id;
  });
  useEffect(() => {
    FetchData();
    if (localStorage.getItem("user")) {
      CartLength();
    }
    // eslint-disable-next-line
  }, []);

  // Add to cart Function;
  const AddToCart = async (id) => {
    if(localStorage.getItem('user')){
      const user = await CheckAuth(localStorage.getItem("user"));
      const { _id, cart } = user;
      let CheckExists = await cart.filter((each)=>{
        return each===id
      })
      if (CheckExists.length === 0) {
        cart.push(id);
        let length = cart.length;
        let countEle = document.getElementById("cart-count");
        countEle.innerHTML = length;
        SuccessShow("Product Added Successfully !")
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
      ErrorShow("Product Already added to cart !")
      // navigate('/bag')
    }
    else{
      ErrorShow("Please Login to Add Items");
    }
  };
  return (
    <div>
      <div className="product-details-main-container">
        {product.map((each) => {
          const {
            imgURL,
            longName,
            salePrice,
            _id,
            maxPrice,
            emi,
            description,
            rating,
            reviews,
            deliverycost,
            deliverydate,
            specifications,
            name,
          } = each;

          const dayToday = new Date();
          const date = dayToday.getDate();
          const updatedDate = date + Number(deliverydate);
          dayToday.setDate(updatedDate);

          return (
            <div key={_id} className="product-detail-container d-flex ">
              <div className="product-detail-container-img">
                <img src={imgURL} alt="img1" draggable="false"/>
                <div className="product-details-btns mt-4">
                  <Link onClick={(e) => AddToCart(_id)}>Add To Cart</Link>
                  <Link to={""}>Buy Now</Link>
                </div>
              </div>
              <div className="product-detail-content">
                <Link to={`/${params.root}`} className="back-to-products-btn">
                  <i className="fa-solid fa-arrow-left-long"></i> Back To
                  Products
                </Link>
                <p>{name}</p>
                <h4>{longName}</h4>
                <div className="product-price-container">
                  <p style={{ color: "seagreen", fontWeight: "600" }}>
                    Special Price
                  </p>
                  <span>
                    Price -{" "}
                    <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                      Rs. {salePrice}/-
                    </span>{" "}
                    <span style={{ textDecoration: "line-through" }}>
                      Rs. {maxPrice}
                    </span>
                    {"     "}
                    <span style={{ color: "seagreen", fontWeight: "600" }}>
                      {Math.round(((maxPrice - salePrice) / maxPrice) * 100)}%
                      off
                    </span>
                  </span>
                  <p>
                    <span className="text-danger">{deliverycost} </span>
                    {"  "} |
                    <span>
                      {" "}
                      {"  "}Delivery By {dayToday.toDateString()}
                    </span>
                  </p>
                </div>
                <div className="product-offer-container">
                  <h5>Available Offers</h5>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Bank OfferGet ₹25* instant discount for the 1st Shopykit
                    Order using Shopykit UPIT&C
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Bank OfferFlat ₹750 off on HDFC Bank Debit Card EMI
                    Transactions, on orders of ₹7,500 and aboveT&C
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Bank Offer5% Cashback on Flipkart Axis Bank CardT&C
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Combo OfferBuy 2 or more items save ₹60See all productsT&C
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Combo OfferBuy 3 or more items save ₹80See all productsT&C
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Special PriceGet at flat ₹199T&C
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Partner OfferSign-up for Shopykit Pay Later & get free Times
                    Prime Benefits worth ₹10,000*Know More
                  </p>
                  <p>
                    <i
                      className="fa-solid fa-tag"
                      style={{ color: "#148a2b" }}
                    ></i>{" "}
                    Partner OfferMake a purchase and enjoy a surprise cashback/
                    coupon that you can redeem later!Know More
                  </p>
                </div>

                <div className="product-review-container">
                  <h5>Rating And Reviews</h5>
                  <p>
                    <i
                      className="fa-solid fa-star"
                      style={{ color: "#03b045" }}
                    ></i>{" "}
                    {rating} Rating and {reviews} Reviews
                  </p>
                </div>
                <div className="product-description-conatiner">
                  <h5>Description </h5>
                  <p>{description}</p>
                </div>
                <div className="product-payment-container">
                  <h5>Payments Method </h5>
                  <p>
                    <i className="fa-solid fa-circle-check"></i> Cash On
                    Delivery Available
                  </p>
                  <p>
                    <i className="fa-solid fa-circle-check"></i> Emi option
                    available at cost : Rs. {emi}/Month
                  </p>
                  <p></p>
                </div>

                <div className="product-specifications">
                  <h5>Product Specifications & Highlights</h5>
                  <ul>
                    {specifications.map((each, index) => {
                      return (
                        <li
                          className="list-type-circle"
                          style={{ marginBottom: "0.6rem" }}
                          key={index}
                        >
                          {each}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="product-return-policy">
                  <h5>Return Policy</h5>
                  <p>This product is returnable within 7 days know more.</p>
                </div>
                <div className="question-container-main">
                  <h5>Questions & Answers</h5>
                  <hr></hr>
                  <div className="question-container">
                    <p>Q : Thia is forcwear in winter</p>
                    <p>A : No</p>
                  </div>
                  <hr></hr>
                  <div className="question-container">
                    <p>Q : Which material used in shirt</p>
                    <p>A : Cotton</p>
                    <hr></hr>
                  </div>
                  <div className="question-container">
                    <p>Q : Is this for 14year old</p>
                    <p>A : No</p>
                    <hr></hr>
                  </div>
                  <div className="question-container">
                    <p>Q : What is the 16 years old pant size number</p>
                    <p>A : 28</p>
                    <hr></hr>
                  </div>
                  <div className="question-container">
                    <p>Q : Is this for or16 or 15 years boy</p>
                    <p>A : 16</p>
                    <hr></hr>
                  </div>
                  <div className="question-container">
                    <p>Q : What's size Fir 17 year old boy</p>
                    <p>A : 29</p>
                    <hr></hr>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="">
        <ToastContainer
          className="foo"
          style={{ minWidth: "30%", marginTop: "3rem" }}
        />
      </div>
    </div>
  );
}
