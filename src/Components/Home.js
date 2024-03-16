import React,{useEffect} from "react"
import CartLength  from '../Reducers/CartLenght'


export default function Home() {
  useEffect(()=>{
    if (localStorage.getItem("user")) {
      CartLength();
    }
  },[])
  return (
    <div className="home-main-container">
      <div className="text-center">
        <div
          id="demo"
          className="carousel slide home-carousel"
          data-bs-ride="carousel"
        >
          <h2 className="mb-3 home-welcome-msg">
            Welcome to the Shopy
            <span style={{ color: "red", fontSize: "1.8rem" }}>K</span>it !
          </h2>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to="2"
            ></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active carousel-background-1">
              <img
                src={"/home-images/banner-1.png"}
                alt="Los Angeles"
                className="d-block"
                width={"100%"}
              />
            </div>
            <div className="carousel-item">
              <img
                src={"/home-images/banner-2.png"}
                alt="Chicago"
                className="d-block"
                width={"100%"}
              />
            </div>
            <div className="carousel-item">
              <img
                src={"/home-images/banner-3.png"}
                alt="New York"
                className="d-block"
                width={"100%"}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
      <img
        src={
          "https://www.jiomart.com/images/cms/aw_rbslider/slides/1708945475_home_page_1240x209.jpg?im=Resize=(1240,150)"
        }
        alt="img"
        width={"100%"}
        className="mt-3 mb-4"
      />
      <div className="home-offers-cards-container">
        <h4 className="ms-2">Shop From Top Categories</h4>
        <div className="home-offers-card">
          <img
            src={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709225859_Mens_fashion.jpg?im=Resize=(223,280)"
            }
            alt="img"
            width={"19%"}
          />
          <img
            src={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709225903_Womens_fashion.jpg?im=Resize=(223,280)"
            }
            alt="img"
            width={"19%"}
          />
          <img
            src={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1708576126_Karigari_Bedsheets.jpg?im=Resize=(223,280)"
            }
            alt="img"
            width={"19%"}
          />
          <img
            src={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709920510_Footwear.jpg?im=Resize=(223,280)"
            }
            alt="img"
            width={"19%"}
          />
          <img
            src={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1710155713_Kitchen_Appliances.jpg?im=Resize=(223,280)"
            }
            alt="img"
            width={"19%"}
          />
        </div>
        <div className="home-slider-show">
          {/*eslint-disable-next-line */}
          <marquee>
            <img
              src={
                "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709786865_Solethreads_Desktop_web.jpg?im=Resize=(1680,320)"
              }
              alt="img"
              width={"30%"}
            />
            <img
              src={
                "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709215596_Buda_Jeans_Desktop.jpg?im=Resize=(1680,320)"
              }
              alt="img"
              width={"30%"}
            />
            <img
              src={
                "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709215633_Girls_Dress_and_Frocks_Desktop.jpg?im=Resize=(1680,320)"
              }
              alt="img"
              width={"30%"}
            />
            <img
              src={
                "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709215519_Gosiriki_Desktop.jpg?im=Resize=(1680,320)"
              }
              alt="img"
              width={"30%"}
            />
          </marquee>
        </div>
      </div>
      <div className="home-offers-card">
        <img
          src={
            "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709191567_4.jpg?im=Resize=(223,280)"
          }
          alt="img"
          width={"19%"}
        />
        <img
          src={
            "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709196946_4.jpg?im=Resize=(223,280)"
          }
          alt="img"
          width={"19%"}
        />
        <img
          src={
            "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709196857_2.jpg?im=Resize=(223,280)"
          }
          alt="img"
          width={"19%"}
        />
        <img
          src={
            "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709196809_1.jpg?im=Resize=(223,280)"
          }
          alt="img"
          width={"19%"}
        />
        <img
          src={
            "https://www.jiomart.com/images/cms/aw_rbslider/slides/1709197030_6.jpg?im=Resize=(223,280)"
          }
          alt="img"
          width={"19%"}
        />
      </div>

      <h3 className="text-center pb-3">Top Offers For You</h3>
      <div className="home-offers-container">
        <img src="/other-images/home-men-offer.webp" alt="img" />
        <img src="/other-images/home-kitchen-offer.webp" alt="img" />
        <img src="/other-images/home-kitchen-offer-2.webp" alt="img" />
        <img src="/other-images/home-kitchen-offer-1.webp" alt="img" />
        <img src="/other-images/home-watch-offer.webp" alt="img" />
        <img src="/other-images/home-furniture-offer.webp" alt="img" />
        <img src="/other-images/home-men-offer-1.webp" alt="img" />
        <img src="/other-images/home-sneakers-offer.webp" alt="img" />
        <img src="/other-images/home-kitchen-offer-3.webp" alt="img" />
      </div>
    </div>
  );
}
